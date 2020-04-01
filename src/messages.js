/**
 * messages.js
 *
 * This module creates the functions which produce messages for the intent of
 * the planar graph
 */

// module dependencies: npm packages
import { getOver, relativeMousePosition } from '@mvarble/viewport.js';

// our export
export {
  deselectMessage,
  selectionMessage,
  dragSelectMessage,
  moveNodesMessage,
  pendingEdgeMessage,
  updateEdgesMessage,
  addNodeMessage,
  removeNodeMessage,
};


/**
 * These are messages for selecting nodes
 */
function deselectMessage() { return { type: 'deselect-all' }; }

function selectionMessage(graphFrame, event) {
  // parse the node
  const node = event.frame;
  const key = node.key;
  const active = node.data ? node.data.active : false;
  const selected = node.data ? node.data.selected : false;

  // parse the state
  const only = (
    selected
    && graphFrame.children.filter(c => c.data && c.data.selected).length === 1
  );

  // parse the event
  const additive = event.shiftKey;

  // return the message
  return (
    additive
    ? (active ? { type: 'deselect', key } : { type: 'select', key } )
    : (active
      ? (only ? { type: 'deselect', key } : { type: 'select-only', key })
      : { type: 'select-only', key }
    )
  );
}

function dragSelectMessage(event) {
  const frame = event.isDrag.frame;
  return ((frame && frame.data && frame.data.selected) || event.shiftKey)
    ? { type: 'select', key: frame.key }
    : { type: 'select-only', key: frame.key }
}

/**
 * This is the message for moving nodes
 */
function moveNodesMessage(event) {
  return {
    type: 'move-nodes',
    displacement: [event.movementX, event.movementY],
  };
}

/**
 * This is the message for dragging an edge around
 */
function pendingEdgeMessage(graphFrame, event) {
  // get the information of the edge we are dragging
  const [nodeKey, edgeKey] = event.isDrag.treeKeys.slice(-2);

  // parse if we are hovering over a node or its edge
  const { treeKeys } = getOver(event, { ...graphFrame, data: {} }, true);

  // return accordingly
  return (
    (treeKeys.length && treeKeys[0] !== nodeKey)
    ? { tail: treeKeys[0], nodeKey, edgeKey }
    : { to: relativeMousePosition(event), nodeKey, edgeKey }
  );
}

/**
 * This is the message for finalizing an edge drag edit.
 */
function updateEdgesMessage(graphFrame, event) {
  // get the node holding the edge that has updated
  const [nodeKey, key] = event.isDrag.treeKeys.slice(-2);
  const node = graphFrame.children.find(node => node.key === nodeKey);

  // get the keys of the edges which have no tails
  const noTails = node.children.slice(1).filter(e => !e.data.tail)
    .map(e => e.key);

  // return the message
  if (!noTails.length) {
    return { type: 'add-edge', nodeKey, key };
  } else {
    if (noTails.length === 1 && noTails[0] === node.children.slice(-1)[0].key) {
      return { type: 'update-edge', key, nodeKey };
    } else {
      return { type: 'delete-edge', key, nodeKey };
    }
  }
}

/**
 * This is the message for adding a node
 */
function addNodeMessage(request) {
  if (!request) { request = {}; }
  return {
    type: 'add-node',
    location: request.location || [0, 0],
    data: request.data || {}
  };
}

/**
 * This is the message for removing a node
 */
function removeNodeMessage(key) {
  return { type: 'remove-node', key };
}

