/**
 * Planar-Graph.js
 *
 * This module creates the Cycle.js component
 */

// module dependencies: npm packages
import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import sampleCombine from 'xstream/extra/sampleCombine';
import delay from 'xstream/extra/delay';
import { makeCollection } from '@cycle/state';
import isolate from '@cycle/isolate';
import { createDrag, singleClick } from '@mvarble/viewport-utilities';

// module dependencies: project modules
import {
  dragSelectMessage,
  deselectMessage,
  selectionMessage,
  moveNodesMessage,
  pendingEdgeMessage,
  updateEdgesMessage,
  addNodeMessage,
  removeNodeMessage,
} from './messages';
import {
  selectNode,
  moveNode,
  pendingEdge,
  updateEdges,
  addNode,
  removeNode,
  moveGraphNode,
  updateGraphEdges,
  removeGraphNode,
} from './state';

// our export
export {
  PlanarGraph,
  GraphIntent,
  NodeIntent,
  EdgeIntent,
  NodeFrames,
  NodeFrame,
  Graph,
};

/**
 * PlanarGraph
 *
 * This is a Cycle.js component that will maintain a state of a planar graph
 * from the clicks on a viewport maintained by the `ViewportDriver` in 
 * @mvarble/viewport.js. It will be able to add/remove nodes from source
 * streams, move nodes from frameSource click streams, and create create edges
 * between nodes from frameSource click streams.
 *
 * The signature is the standard (sources => sink), where the sources are:
 *
 *   - frameSource: `FrameSource` instance outputted by the `ViewportDriver` 
 *                  and mounted to some `DOMSource`.
 *   - state:       state source, as provided by `withState` in @cycle/state
 *   - addNode:     stream of node frames we would like to add to the graph
 *   - removeNode:  stream of keys corresponding to which node we would like
 *                  removed.
 *
 * The sinks are:
 * 
 *   - state:  a stream of reducers of the state.
 */
function PlanarGraph(sources) {
  // intent
  const intent = GraphIntent(sources);
  const messages$ = xs.merge(...Object.keys(intent).map(k => intent[k]));

  // model
  const state = sources.state;
  const addNode$ = intent.addNode.map(addNode);
  const frames = isolate(NodeFrames, 'children')({ state, ...intent });
  const graph = Graph({ state, ...intent });

  // sink is reducer and messages
  return {
    state: xs.merge(graph.state, frames.state, addNode$),
    messages: messages$,
    debug: state.stream,
  };
}

/**
 * GraphIntent:
 *
 * This component is responsible for parsing the state and `FrameSource` streams
 * and returning streams of messages for the reducer
 */
function GraphIntent(sources) { 
  return { ...NodeIntent(sources), ...EdgeIntent(sources) };
}

function NodeIntent({ frameSource, state, addNode, removeNode }) {
  // get the clicks on nodes
  const nodeSource = frameSource
    .select(frame => frame && frame.type === 'graph-node');

  // single clicks on nodes correspond to calculated selection
  const selectNode$ = nodeSource.events('mousedown')
    .compose(singleClick)
    .compose(sampleCombine(state.stream))
    .map(([event, graphFrame]) => selectionMessage(graphFrame, event));

  // single clicks on nothing correspond to deselection
  const deselectAll$ = frameSource.select(frame => !frame).events('mousedown')
    .compose(singleClick)
    .mapTo(deselectMessage());

  // drags induce a form of selection/activation
  const drag$$ = nodeSource.events('mousedown').compose(createDrag);
  const selectDrag$ = drag$$.map(drag$ => drag$.take(1).map(dragSelectMessage))
    .flatten();

  // drags induce displacement
  const moveNode$ = drag$$.flatten().map(moveNodesMessage);

  // addNode
  const addNode$ = addNode.map(addNodeMessage);

  // removeNode
  const removeNode$ = removeNode.filter(a => a).map(removeNodeMessage);

  return {
    selectNode: xs.merge(selectNode$, deselectAll$, selectDrag$),
    moveNode: moveNode$,
    addNode: addNode$,
    removeNode: removeNode$,
  };
}

function EdgeIntent({ frameSource, state }) {
  // get the drags on the edges
  const drag$$ = frameSource.select(f => f && f.type === 'out-edge-node')
    .events('mousedown')
    .compose(createDrag);

  // drags allow one view potential connections
  const pendingEdge$ = drag$$.flatten()
    .compose(sampleCombine(state.stream))
    .map(([event, graphFrame]) => pendingEdgeMessage(graphFrame, event));

  // at the end of a drag, we parse if the node needs to remove/add 
  // out-edge-node frames
  const updateEdges$ = drag$$
    .map(drag$ => drag$.filter(e => e.type === 'mouseup').compose(delay(0)))
    .flatten()
    .compose(sampleCombine(state.stream))
    .map(([event, graphFrame]) => updateEdgesMessage(graphFrame, event));

  return {
    pendingEdge: pendingEdge$,
    updateEdges: updateEdges$,
  };
}

/**
 * NodeFrames:
 *
 * The state of the PlanarGraph is a frame of the form:
 *
 * {
 *   type: 'planar-graph',
 *   worldMatrix: [...],
 *   children: [...],
 *   data: { graph: {...} },
 * }
 *
 * and this component is responsible for handling the `children` array.
 */
function NodeFrames(sources) {
  // node selection happens on scale of all the nodes
  const selectNode$ = sources.selectNode.map(selectNode);

  // moving nodes happens on the scale of all the nodes
  const moveNode$ = sources.moveNode.map(moveNode);

  // removing nodes happens on the scale of all the nodes
  const removeNode$ = sources.removeNode.map(removeNode);

  // remaining reducers happen on the level of a single node
  const nodesSink = makeCollection({
    item: NodeFrame,
    itemKey: childState => childState.key,
    itemScope: key => key,
    collectSinks: instances => ({ state: instances.pickMerge('state') }),
  })(sources);

  return {
    state: xs.merge(
      selectNode$,
      moveNode$,
      removeNode$,
      nodesSink.state
    ),
  };
}

function NodeFrame(sources) {
  const pendingEdge$ = sources.pendingEdge
    .compose(sampleCombine(sources.state.stream))
    .filter(([message, node]) => message.nodeKey === node.key)
    .map(([message]) => pendingEdge(message));

  const updateEdges$ = sources.updateEdges
    .compose(sampleCombine(sources.state.stream))
    .filter(([message, node]) => message.nodeKey === node.key)
    .map(([message]) => updateEdges(message));

  return { state: xs.merge(pendingEdge$, updateEdges$) };
}

/**
 * Graph:
 *
 * The state of the PlanarGraph is a frame of the form:
 *
 * {
 *   type: 'planar-graph',
 *   worldMatrix: [...],
 *   children: [...],
 *   data: { graph: { nodes: {...}, edges: {...} } },
 * }
 *
 * This component is responsible for handling the `state.data.graph` part of
 * the object.
 */
function Graph(sources) {
  const moveNode$ = sources.moveNode.map(moveGraphNode);
  const updateEdges$ = sources.updateEdges.map(updateGraphEdges);
  const removeNode$ = sources.removeNode.map(removeGraphNode);
  return { 
    state: xs.merge(
      moveNode$,
      updateEdges$,
      removeNode$,
    ),
  };
}
