/**
 * state.js
 *
 * This module is responsible for creating reducers which edit the state of a
 * graph
 */

// module dependencies: npm packages
import {
  translatedFrame,
  identityFrame,
  vecFrameTrans,
  locsFrameTrans,
  transformedByMatrix,
} from '@mvarble/frames.js';

export {
  newKey,
  castGraph,
  castGraphFrame,
  deselected,
  inactive,
  selected,
  selectNode,
  moveNode,
  pendingEdge,
  updateEdges,
  deletedEdge,
  addedEdge,
  updatedEdge,
  scoot,
  newEdge,
  removeNode,
  moveGraphNode,
  createDisplacer,
  updateGraphEdges,
  edittedGraphEdge,
  addedGraphEdge,
  deletedGraphEdge,
  removeGraphNode,
  addNode,
  createNodeFrame,
}

function newKey(node) {
  const keys = node.children.map(e => e.key).filter(k => typeof k === 'number');
  return keys.length ? Math.max(...keys) + 1 : 1;
}

/**
 * These two functions allow us to create states on the fly
 */
function castGraph(graph) {
  if (!graph) return { nodes: [], edges: [] };
  return { ...graph, nodes: graph.nodes || [], edges: graph.edges || [] };
}

function castGraphFrame(graphFrame) {
  const gf = graphFrame || {};
  return {
    type: 'graph-frame',
    worldMatrix: gf.worldMatrix || [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    children: gf.children || [],
    data: { 
      ...(gf.data || {}),
      graph: castGraph((gf.data || {}).graph),
    },
  };
}

/**
 * Frame reducer for selection of nodes.
 */
function deselected(node) { 
  return {
    ...node, 
    data: { ...node.data, active: undefined, selected: undefined } 
  };
}

function inactive(node) {
  return {
    ...node, 
    data: { ...node.data, active: undefined } 
  };
}

function selected(node) {
  return {
    ...node,
    data: { ...node.data, active: true, selected: true },
  };
}

function selectNode({ type, key }) {
  return nodes => {
    if (type === 'deselect-all') { return nodes.map(deselected); }
    if (type === 'deselect') {
      const index = nodes.findIndex(n => n.key === key);
      if (index === -1) return nodes;
      const reducer = (obj, n, i) => (n.data && n.data.selected && i !== index)
        ? { ...obj, selected: [...obj.selected, n] }
        : { ...obj, unselected: [...obj.unselected, deselected(n)] };
      const parsed = nodes.reduce(reducer, { selected: [], unselected: [] });
      return [ ...parsed.selected, ...parsed.unselected ];
    }
    if (type === 'select-only') {
      const index = nodes.findIndex(n => n.key === key);
      if (index === -1) return nodes;
      return [
        selected(nodes[index]),
        ...nodes.slice(0, index).map(deselected),
        ...nodes.slice(index + 1).map(deselected),
      ];
    }
    if (type === 'select') {
      const index = nodes.findIndex(n => n.key === key)
      if (index === -1) return nodes;
      return [
        selected(nodes[index]),
        ...nodes.slice(0, index).map(inactive),
        ...nodes.slice(index + 1).map(inactive),
      ];
    }
  }
}

/**
 * Frame reducer for moving nodes
 */
function moveNode({ displacement }) {
  return nodes => {
    const reducer = (obj, n, i) => (n.data && n.data.selected)
      ? { ...obj, selected: [...obj.selected, n] }
      : { ...obj, unselected: [...obj.unselected, n] };
    const parsed = nodes.reduce(reducer, { selected: [], unselected: [] });
    const displace = node => translatedFrame(node, displacement, identityFrame);
    return [
      ...parsed.selected.map(displace),
      ...parsed.unselected,
    ];
  }
}

/**
 * Frame reducer for edge manipulation
 */
function pendingEdge({ to, tail, edgeKey }) {
  return node => {
    const index = node.children.findIndex(e => e.key === edgeKey);
    if (index === -1) return node;
    return {
      ...node,
      children: [
        ...node.children.slice(0, index),
        { 
          ...node.children[index], 
          data: { 
            ...node.children[index].data,
            to: to ? to : undefined,
            tail: tail ? tail : undefined,
          },
        },
        ...node.children.slice(index + 1),
      ],
    };
  };
}

function updateEdges({ type, key }) {
  return node => (
    type === 'update-edge'
    ? updatedEdge(node, key)
    : (type === 'add-edge'
      ? addedEdge(node, key)
      : deletedEdge(node, key)
    )
  );
}

function deletedEdge(node, key) {
  const L = node.children.length;
  const k = node.children.findIndex(e => e.key === key);
  const d = L * (L - 1);
  const a = (L-k-1)/d;
  return {
    ...node,
    children: [
      node.children[0],
      ...node.children.slice(1, k).map((e, j) => scoot(e, (j+1)/d, node)),
      ...node.children.slice(k+1).map((e, j) => scoot(e, j/d-a, node)),
    ]
  };
}

function addedEdge(node, key) {
  const L = node.children.length;
  const d = L * (L + 1);
  return {
    ...node,
    children: [
      node.children[0],
      ...node.children.slice(1).map((e, j) => scoot(e, -(j+1)/d, node)),
      newEdge(node, newKey(node)),
    ]
  };
}

function updatedEdge(node, key) {
  const index = node.children.findIndex(e => e.key === key);
  return {
    ...node,
    children: [
      ...node.children.slice(0, index),
      {
        ...node.children[index],
        data: { ...node.children[index].data, to: undefined },
      },
      ...node.children.slice(index + 1),
    ],
  };
}

function scoot(edge, amount, node) {
  return translatedFrame(
    edge,
    [2 * amount, 0],
    node
  );
}

function newEdge(node, key) {
  const L = node.children.length;
  return { 
    ...scoot(node.children[L-1], 1/(L * (L + 1)), node),
    key,
    data: { clickBox: [-1, -1, 1, 1] },
  };
}

/**
 * Frame reducer for removing node
 */
function removeNode({ key }) {
  return nodes => {
    const index = nodes.findIndex(node => node.key === key);
    if (index === -1) return nodes;
    const toNode = edge => (edge && edge.data && edge.data.tail === key);
    const filteredNodes = nodes.map(node => node.children.reduce(
      (node, edge) => toNode(edge) ? deletedEdge(node, edge.key) : node,
      node
    ));
    return [
      ...filteredNodes.slice(0, index),
      ...filteredNodes.slice(index + 1),
    ];
  };
}

/**
 * Graph reducer for moving nodes
 */
function moveGraphNode({ displacement }) {
  return graphFrame => {
    const selected = graphFrame.children.filter(n => n.data && n.data.selected)
      .map(n => n.key);
    const displace = createDisplacer(displacement, graphFrame, selected);
    return {
      ...graphFrame,
      data: {
        ...graphFrame.data,
        graph: {
          ...graphFrame.data.graph,
          nodes: graphFrame.data.graph.nodes.map(displace),
        }
      }
    };
  };
}

function createDisplacer(displacement, graphFrame, selected) {
  const [dx, dy] = vecFrameTrans(displacement, identityFrame, graphFrame);
  return node => (
    selected.includes(node.key)
    ? { ...node, location: [node.location[0] + dx, node.location[1] + dy] }
    : node
  );
}


/**
 * Graph reducer for manipulating edges
 */
function updateGraphEdges({ type, nodeKey, key }) {
  return graphFrame => (
    type === 'delete-edge'
    ? deletedGraphEdge(graphFrame, nodeKey, key)
    : (type === 'add-edge'
      ? addedGraphEdge(graphFrame, nodeKey, key)
      : edittedGraphEdge(graphFrame, nodeKey, key)
    )
  );
}

function edittedGraphEdge(graphFrame, nodeKey, key) {
  const out = { 
    ...graphFrame,
    data: {
      ...graphFrame.data,
      graph: {
        ...graphFrame.data.graph,
        edges: [
          ...graphFrame.data.graph.edges,
        ],
      },
    },
  };
  const tail = out.children.find(n => n.key === nodeKey).children
    .find(e => e.key === key).data.tail;
  out.data.graph.edges = out.data.graph.edges.map(
    e => (e.key === key && e.head === nodeKey) ? { ...e, tail } : e
  );
  return out;
}

function addedGraphEdge(graphFrame, nodeKey, key) {
  const out = { 
    ...graphFrame,
    data: {
      ...graphFrame.data,
      graph: {
        ...graphFrame.data.graph,
        edges: [
          ...graphFrame.data.graph.edges,
        ],
      },
    },
  };
  const tail = out.children.find(n => n.key === nodeKey).children
    .find(e => e.key === key).data.tail;
  out.data.graph.edges = 
    [ ...out.data.graph.edges, { key, head: nodeKey, tail } ];
  return out;
}

function deletedGraphEdge(graphFrame, nodeKey, key) {
  const out = { 
    ...graphFrame,
    data: {
      ...graphFrame.data,
      graph: {
        ...graphFrame.data.graph,
        edges: [
          ...graphFrame.data.graph.edges,
        ],
      },
    },
  };
  out.data.graph.edges = out.data.graph.edges
    .filter(e => e.key !== key || e.head !== nodeKey);
  return out;
}

/**
 * Graph reducer for removing node
 */
function removeGraphNode({ key }) {
  return graphFrame => ({
    ...graphFrame,
    data: {
      ...graphFrame.data,
      graph: {
        nodes: graphFrame.data.graph.nodes.filter(node => node.key !== key),
        edges: graphFrame.data.graph.edges.filter(edge => (
          edge.tail !== key && edge.head !== key
        )),
      },
    },
  });
}

/**
 * reducer for adding node
 */
function addNode({ data, location }) {
  return graphFrame => {
    // cast undefined data to an object
    data = data || {};

    // create the new node
    const newNode = createNodeFrame(graphFrame, data, location);
    const key = newNode.key;

    // return the state
    return {
      ...graphFrame,
      children: [
        selected(newNode),
        ...graphFrame.children.map(deselected),
      ],
      data: {
        ...graphFrame.data,
        graph: {
          ...graphFrame.data.graph,
          nodes: [{ key, location, data }, ...graphFrame.data.graph.nodes],
        },
      },
    };
  };
}

function createNodeFrame(graphFrame, data, [x,y]) {
  // get the dimensions from the data
  let { width, height } = (data && data.width && data.height) 
    ? data 
    : { width: 1, height: 1 };
  width = (width === 0) ? 1 : width;
  height = (height === 0) ? 1 : height;

  // create the skeleton of the node
  const { worldMatrix } = graphFrame;
  const node = transformedByMatrix(
    { worldMatrix },
    [[width, 0, x], [0, height, y], [0, 0, 1]]
  );

  // create the in-edge-node
  const inEdge = transformedByMatrix(
    { type: 'in-edge-node', worldMatrix: node.worldMatrix },
    [[0.1 / width, 0, 0], [0, 0.1 / height, 0.9], [0, 0, 1]],
  );

  // create the out-edge-node
  const outEdge = transformedByMatrix(
    { type: 'out-edge-node', key: 1, worldMatrix: node.worldMatrix },
    [[0.1 / width, 0, 0], [0, 0.1 / height, -0.9], [0, 0, 1]],
  );

  // return the complete node
  return {
    ...node,
    type: 'graph-node',
    key: newKey(graphFrame),
    data: { ...data, clickBox: [-1, -1, 1, 1] },
    children: [inEdge, { ...outEdge, data: { clickBox: [-1, -1, 1, 1] } }],
  };
}
