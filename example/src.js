const xs = require('xstream').default;
const sampleCombine = require('xstream/extra/sampleCombine').default;
const { run } = require('@cycle/run');
const { withState } = require('@cycle/state');
const { makeDOMDriver, h } = require('@cycle/dom');
const { Viewport, ViewportDriver } = require('@mvarble/viewport.js');
const { withWindow, parentDims, putInWindow } = require('@mvarble/viewport-utilities');
const { PlanarGraph, renderGraph, castGraphFrame } = require('../index');
const GIFEncoder = require('gifencoder');

const initial = { worldMatrix: [[0, -35, 600], [35, 0, 200], [0, 0, 1]] };

const render = (canvas, graphFrame) => {
  const { width, height } = graphFrame;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'gray';
  context.fillRect(0, 0, width, height);
  renderGraph(context, graphFrame.children[1]);
}

function app({ state, DOM, viewport }) {
  // intent
  const frameSource = viewport.mount(DOM.select('canvas'));
  const add$ = DOM.select('button.add').events('click');
  const delete$ = DOM.select('button.delete').events('click');
  const dims$ = DOM.select('canvas').element().compose(parentDims);

  // model
  const addNode$ = add$.mapTo(undefined);
  const removeNode$ = delete$.compose(sampleCombine(state.stream))
    .filter(([_, frame]) => frame && frame.children && frame.children[1])
    .map(([_, frame]) => frame.children[1])
    .filter(frame => frame.children && frame.children.length)
    .map(frame => frame.children.filter(n => n.data && n.data.selected)) 
    .filter(nodes => nodes.length)
    .map(nodes => xs.fromArray(nodes.map(node => node.key)))
    .flatten();
  const graphSink = withWindow(PlanarGraph)({
    frameSource,
    state,
    addNode: addNode$,
    removeNode: removeNode$,
    dimensions: dims$,
  });

  // view
  const viewportSink = Viewport({
    DOM,
    state: state.stream,
    canvas: xs.of(h('canvas', {
      attrs: { width: 1200, height: 400 },
      style: { background: 'gray' },
    })),
    render: xs.of(render),
    parseDeep: xs.of(true),
  });
  const dom$ = xs.combine(state.stream, viewportSink.DOM)
    .map(([graphFrame, canvas]) => h(
      'div',
      { style: { width: '100vw', height: '100vh' } },
      [
        canvas,
        h(
          'button.add',
          { style: { position: 'fixed', display: 'block', bottom: '25px', right: 0 } },
          ['Add']
        ),
        h(
          'button.delete',
          { style: { position: 'fixed', display: 'block', bottom: '0px', right: 0 } },
          ['Delete']
        ),
      ],
    ));

  return {
    state: graphSink.state.startWith(() => putInWindow(castGraphFrame(initial), 1200, 400)),
    DOM: dom$,
    viewport: viewportSink.viewport,
    gif: DOM.select('canvas').element().take(1),
    debug: l$ => l$.addListener({ next: console.log }),
  };
}

run(withState(app), {
  DOM: makeDOMDriver('#app'),
  viewport: ViewportDriver,
  //gif: makeGifRecorder(),
});

function makeGifRecorder() {
  // build an encoder
  const encoder = new GIFEncoder(1200, 400);
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(1000/24.);
  encoder.setQuality(10);
  const readStream = encoder.createReadStream();
  const list = [];
  readStream.on('data', (chunk) => {
    console.log('frame');
    list.push(chunk)
  });
  readStream.on('end', () => {
    const blob = new Blob(list, { type: 'image/gif' });
    const url = URL.createObjectURL(blob);
    const image = document.createElement('img');
    image.src = url;
    document.body.appendChild(image);
  });
  console.log(readStream);

  // return the driver
  function driver(elm$) {
    elm$.map(elm => xs.periodic(1000/6.).mapTo(elm))
      .flatten().take(24 * 5).addListener({
        next: elm => {
          encoder.addFrame(elm.getContext('2d'));
        },
        complete: () => {
          console.log('end');
          encoder.finish();
        }
      });
  }
  return driver;
}
