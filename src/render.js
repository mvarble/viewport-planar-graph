/**
 * render.js
 *
 * This module is responsible for exporting render functions for the graph
 */

// module dependencies: npm packages
import { renderBox } from '@mvarble/viewport-utilities';
import { locFrameTrans, identityFrame } from '@mvarble/frames.js';

// our export
export{ renderNode, renderEdge, renderGraph };

/**
 * our render functions
 */
function renderNode(context, node, options) {
  // parse the options
  const {
    activeBorder,
    selectedBorder,
    deselectedBorder,
    fillStyle,
    inFillStyle,
    outFillStyle,
  } = (options || {});
  context.strokeStyle = (
    node.data.active
    ? (activeBorder || 'yellow')
    : (node.data.selected
      ? (selectedBorder || '#cc7f19')
      : (deselectedBorder || 'black')
    )
  );

  // render the node
  context.fillStyle = fillStyle || 'rgba(255, 255, 255, 0.8)';
  renderBox(context, node, { fill: true, stroke: true });

  // render the edge nodes
  node.children.forEach(edge => {
    context.fillStyle = (
      (edge.type === 'in-edge-node')
      ? (inFillStyle || 'rgba(255, 200, 0, 1)')
      : (outFillStyle || 'rgba(0, 255, 200, 1)')
    );
    renderBox(context, edge, { fill: true, stroke: true });
  });
}

function renderEdge(context, graphFrame, edge, options) {
  const { toColor, tailColor } = (options || {});
  if (edge.type !== 'out-edge-node') return;
  if (edge.data && edge.data.to) {
    context.strokeStyle = toColor || '#DDD';
    context.beginPath();
    context.moveTo(...locFrameTrans([0, 0], edge, identityFrame));
    context.lineTo(...edge.data.to);
    context.stroke();
  } else if (edge.data && edge.data.tail) {
    context.strokeStyle = tailColor || '#AAA';
    const n = graphFrame.children.find(n => n.key === edge.data.tail);
    context.beginPath();
    context.moveTo(...locFrameTrans([0, 0], edge, identityFrame));
    context.lineTo(...locFrameTrans([0, 0], n.children[0], identityFrame));
    context.stroke();
  }
}

function renderGraph(context, graphFrame, options) {
  context.lineWidth = 3;
  graphFrame.children.forEach(n => (
    n.children.forEach(edge => renderEdge(context, graphFrame, edge, options))
  ));
  context.lineWidth = 1;
  graphFrame.children.slice(0).reverse()
    .forEach(node => renderNode(context, node, options));
}
