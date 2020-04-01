# viewport-planar-graph

A [Cycle.js](https://cycle.js.org/) component for managing planar graphs and interfacing them with the [viewport.js](https://github.com/mvarble/viewport.js) API.

# Example

For Blender users, this UI may look familiar.
The user is able to create and drag collections of nodes around in the plane drag edges between them with ease.

![viewport example](https://raw.githubusercontent.com/mvarble/viewport-planar-graph/master/example.gif)

# API

## PlanarGraph

```js
sink = PlanarGraph({ state, frameState, addNode, removeNode })
```

### Manages a State

This is a component that is responsible for maintaining a state of the form:
```js
{
  type: 'graph-frame',
  worldMatrix: [...],
  children: [
    { type: 'graph-node', key: 1, children: [...], data: {...} },
    ...
    { type: 'graph-node', key: 420, children: [...], data: {...} },
  ],
  data: { 
    graph: {
      nodes: [
        { key: 1, data: {...}, location: [x1, y1] },
        ...
        { key: 420, data: {...}, location: [x420, y420] },
      ], 
      edges: [
        { key: 1, head: 0, tail: 69 }
        ...
        { key: 666, head: 8, tail: 23 }
      ] 
    } 
  }
}
```
The object is intended to be a [frames.js](https://github.com/mvarble/frames.js) frame, capable of being parsed for clicks on the canvas.
The `graphFrame.data.graph` serves in some sense as a redundant copy of the information in `graphFrame.children`, but more easily parsable by the user.
Each element of `graphFrame.data.nodes` has a `location` key which encodes the coordinates of the node with respect to the coordinate system of the entire object.
Each element of `graphFrame.data.edges` has `head` and `tail` keys, which correspond to the directed edge between the nodes of which `node.key` matches.

The component is designed to manage this state by taking streams of clicks from a [viewport.js](https://github.com/mvarble/viewport.js) `ViewportDriver`.
The state this component manages can then be embedded into the state of a `Viewport` component and be rendered accordingly.

### Signature

The sources are:
  - frameSource: a `FrameSource` instance with mounted `DOMSource`, as outputted by the `ViewportDriver`; see [more here](https://github.com/mvarble/viewport.js#viewportdriver).
  - state: the state source as provided by `withState`; see more [here](https://cycle.js.org/api/state.html#cycle-state-source).
  - addNode: a stream of objects of the form `{ location: [x, y], data: {...} }`, as one would see in an element of `graphFrame.data.graph.nodes`.
  - removeNode: a stream of keys corresponding to that belonging to the node we would like to remove.

The sinks are:
  - state: a stream of reducers.
  - messages: a stream of logs for the intent of the graph.

## renderGraph

```js
renderGraph(context, graphFrame, options)
```

This is an imperative function that is intended to be called within the `render` function of a `Viewport` component; see [more here](https://github.com/mvarble/viewport.js#viewport).
The `context` is the canvas context we are using to render, the `graphFrame` is the state of the planar graph, and `options` is an (optional) object with attributes:

  - activeBorder: the color of the border of a node that is *active*,
  - selectedBorder: the color of the border of a node that is *selected*,
  - deselectedBorder: the color of the border of a node that is neither of the above.
  - fillStyle: the fill of a node.
  - inFillStyle: the fill of the little box that *takes in* edges.
  - outFillStyle: the fill of the little box that *gives out* edges.
  - toColor: the color of an edge that is not connected to anything (when dragging)
  - tailColor: the color of an edge that is connected to another node.
