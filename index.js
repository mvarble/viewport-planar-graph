module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}([function(e,t){e.exports=require("@mvarble/frames.js")},function(e,t){e.exports=require("@mvarble/viewport-utilities")},function(e,t){e.exports=require("xstream")},function(e,t){e.exports=require("xstream/extra/sampleCombine")},function(e,t){e.exports=require("xstream/extra/delay")},function(e,t){e.exports=require("@cycle/state")},function(e,t){e.exports=require("@cycle/isolate")},function(e,t){e.exports=require("@mvarble/viewport.js")},function(e,t){e.exports=require("xstream/extra/fromEvent")},function(e,t,r){"use strict";r.r(t),r.d(t,"PlanarGraph",(function(){return se})),r.d(t,"GraphIntent",(function(){return pe})),r.d(t,"NodeIntent",(function(){return ye})),r.d(t,"EdgeIntent",(function(){return me})),r.d(t,"NodeFrames",(function(){return ge})),r.d(t,"NodeFrame",(function(){return he})),r.d(t,"Graph",(function(){return ve})),r.d(t,"deselectMessage",(function(){return v})),r.d(t,"selectionMessage",(function(){return b})),r.d(t,"dragSelectMessage",(function(){return O})),r.d(t,"moveNodesMessage",(function(){return j})),r.d(t,"pendingEdgeMessage",(function(){return k})),r.d(t,"updateEdgesMessage",(function(){return w})),r.d(t,"addNodeMessage",(function(){return S})),r.d(t,"removeNodeMessage",(function(){return E})),r.d(t,"newKey",(function(){return F})),r.d(t,"castGraph",(function(){return K})),r.d(t,"castGraphFrame",(function(){return T})),r.d(t,"deselected",(function(){return B})),r.d(t,"inactive",(function(){return C})),r.d(t,"selected",(function(){return q})),r.d(t,"selectNode",(function(){return _})),r.d(t,"moveNode",(function(){return U})),r.d(t,"pendingEdge",(function(){return $})),r.d(t,"updateEdges",(function(){return W})),r.d(t,"deletedEdge",(function(){return X})),r.d(t,"addedEdge",(function(){return Y})),r.d(t,"updatedEdge",(function(){return z})),r.d(t,"scoot",(function(){return H})),r.d(t,"newEdge",(function(){return J})),r.d(t,"removeNode",(function(){return L})),r.d(t,"moveGraphNode",(function(){return Q})),r.d(t,"createDisplacer",(function(){return R})),r.d(t,"updateGraphEdges",(function(){return V})),r.d(t,"edittedGraphEdge",(function(){return Z})),r.d(t,"addedGraphEdge",(function(){return ee})),r.d(t,"deletedGraphEdge",(function(){return te})),r.d(t,"removeGraphNode",(function(){return re})),r.d(t,"addNode",(function(){return ne})),r.d(t,"createNodeFrame",(function(){return ae})),r.d(t,"renderNode",(function(){return je})),r.d(t,"renderEdge",(function(){return ke})),r.d(t,"renderGraph",(function(){return we}));var n=r(2),a=r.n(n),o=(r(8),r(3)),i=r.n(o),c=r(4),u=r.n(c),d=r(5),l=r(6),f=r.n(l),s=r(1),p=r(7);function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function v(){return{type:"deselect-all"}}function b(e,t){var r=t.frame,n=r.key,a=!!r.data&&r.data.active,o=!!r.data&&r.data.selected&&1===e.children.filter((function(e){return e.data&&e.data.selected})).length;return t.shiftKey?a?{type:"deselect",key:n}:{type:"select",key:n}:a&&o?{type:"deselect",key:n}:{type:"select-only",key:n}}function O(e){var t=e.isDrag.frame;return t&&t.data&&t.data.selected||e.shiftKey?{type:"select",key:t.key}:{type:"select-only",key:t.key}}function j(e){return{type:"move-nodes",displacement:[e.movementX,e.movementY]}}function k(e,t){var r=g(t.isDrag.treeKeys.slice(-2),2),n=r[0],a=r[1],o=Object(p.getOver)(t,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e,{data:{}}),!0).treeKeys;return o.length&&o[0]!==n?{tail:o[0],nodeKey:n,edgeKey:a}:{to:Object(s.relativeMousePosition)(t),nodeKey:n,edgeKey:a}}function w(e,t){var r=g(t.isDrag.treeKeys.slice(-2),2),n=r[0],a=r[1],o=e.children.find((function(e){return e.key===n})),i=o.children.slice(1).filter((function(e){return!e.data.tail})).map((function(e){return e.key}));return i.length?1===i.length&&i[0]===o.children.slice(-1)[0].key?{type:"update-edge",key:a,nodeKey:n}:{type:"delete-edge",key:a,nodeKey:n}:{type:"add-edge",nodeKey:n,key:a}}function S(e){return e||(e={}),{type:"add-node",location:e.location||[0,0],data:e.data||{}}}function E(e){return{type:"remove-node",key:e}}var x=r(0);function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}(e,t)||G(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){A(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e){return function(e){if(Array.isArray(e))return D(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||G(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e,t){if(e){if("string"==typeof e)return D(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?D(e,t):void 0}}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function F(e){var t=e.children.map((function(e){return e.key})).filter((function(e){return"number"==typeof e}));return t.length?Math.max.apply(Math,I(t))+1:1}function K(e){return e?P({},e,{nodes:e.nodes||[],edges:e.edges||[]}):{nodes:[],edges:[]}}function T(e){var t=e||{};return{type:"graph-frame",worldMatrix:t.worldMatrix||[[1,0,0],[0,1,0],[0,0,1]],children:t.children||[],data:P({},t.data||{},{graph:K((t.data||{}).graph)})}}function B(e){return P({},e,{data:P({},e.data,{active:void 0,selected:void 0})})}function C(e){return P({},e,{data:P({},e.data,{active:void 0})})}function q(e){return P({},e,{data:P({},e.data,{active:!0,selected:!0})})}function _(e){var t=e.type,r=e.key;return function(e){if("deselect-all"===t)return e.map(B);if("deselect"===t){var n=e.findIndex((function(e){return e.key===r}));if(-1===n)return e;var a=e.reduce((function(e,t,r){return t.data&&t.data.selected&&r!==n?P({},e,{selected:[].concat(I(e.selected),[t])}):P({},e,{unselected:[].concat(I(e.unselected),[B(t)])})}),{selected:[],unselected:[]});return[].concat(I(a.selected),I(a.unselected))}if("select-only"===t){var o=e.findIndex((function(e){return e.key===r}));return-1===o?e:[q(e[o])].concat(I(e.slice(0,o).map(B)),I(e.slice(o+1).map(B)))}if("select"===t){var i=e.findIndex((function(e){return e.key===r}));return-1===i?e:[q(e[i])].concat(I(e.slice(0,i).map(C)),I(e.slice(i+1).map(C)))}}}function U(e){var t=e.displacement;return function(e){var r=e.reduce((function(e,t,r){return t.data&&t.data.selected?P({},e,{selected:[].concat(I(e.selected),[t])}):P({},e,{unselected:[].concat(I(e.unselected),[t])})}),{selected:[],unselected:[]});return[].concat(I(r.selected.map((function(e){return Object(x.translatedFrame)(e,t,x.identityFrame)}))),I(r.unselected))}}function $(e){var t=e.to,r=e.tail,n=e.edgeKey;return function(e){var a=e.children.findIndex((function(e){return e.key===n}));return-1===a?e:P({},e,{children:[].concat(I(e.children.slice(0,a)),[P({},e.children[a],{data:P({},e.children[a].data,{to:t||void 0,tail:r||void 0})})],I(e.children.slice(a+1)))})}}function W(e){var t=e.type,r=e.key;return function(e){return"update-edge"===t?z(e,r):"add-edge"===t?Y(e,r):X(e,r)}}function X(e,t){var r=e.children.length,n=e.children.findIndex((function(e){return e.key===t})),a=r*(r-1),o=(r-n-1)/a;return P({},e,{children:[e.children[0]].concat(I(e.children.slice(1,n).map((function(t,r){return H(t,(r+1)/a,e)}))),I(e.children.slice(n+1).map((function(t,r){return H(t,r/a-o,e)}))))})}function Y(e,t){var r=e.children.length,n=r*(r+1);return P({},e,{children:[e.children[0]].concat(I(e.children.slice(1).map((function(t,r){return H(t,-(r+1)/n,e)}))),[J(e,F(e))])})}function z(e,t){var r=e.children.findIndex((function(e){return e.key===t}));return P({},e,{children:[].concat(I(e.children.slice(0,r)),[P({},e.children[r],{data:P({},e.children[r].data,{to:void 0})})],I(e.children.slice(r+1)))})}function H(e,t,r){return Object(x.translatedFrame)(e,[2*t,0],r)}function J(e,t){var r=e.children.length;return P({},H(e.children[r-1],1/(r*(r+1)),e),{key:t,data:{clickBox:[-1,-1,1,1]}})}function L(e){var t=e.key;return function(e){var r=e.findIndex((function(e){return e.key===t}));if(-1===r)return e;var n=e.map((function(e){return e.children.reduce((function(e,r){return function(e){return e&&e.data&&e.data.tail===t}(r)?X(e,r.key):e}),e)}));return[].concat(I(n.slice(0,r)),I(n.slice(r+1)))}}function Q(e){var t=e.displacement;return function(e){var r=e.children.filter((function(e){return e.data&&e.data.selected})).map((function(e){return e.key})),n=R(t,e,r);return P({},e,{data:P({},e.data,{graph:P({},e.data.graph,{nodes:e.data.graph.nodes.map(n)})})})}}function R(e,t,r){var n=N(Object(x.vecFrameTrans)(e,x.identityFrame,t),2),a=n[0],o=n[1];return function(e){return r.includes(e.key)?P({},e,{location:[e.location[0]+a,e.location[1]+o]}):e}}function V(e){var t=e.type,r=e.nodeKey,n=e.key;return function(e){return"delete-edge"===t?te(e,r,n):"add-edge"===t?ee(e,r,n):Z(e,r,n)}}function Z(e,t,r){var n=P({},e,{data:P({},e.data,{graph:P({},e.data.graph,{edges:I(e.data.graph.edges)})})}),a=n.children.find((function(e){return e.key===t})).children.find((function(e){return e.key===r})).data.tail;return n.data.graph.edges=n.data.graph.edges.map((function(e){return e.key===r&&e.head===t?P({},e,{tail:a}):e})),n}function ee(e,t,r){var n=P({},e,{data:P({},e.data,{graph:P({},e.data.graph,{edges:I(e.data.graph.edges)})})}),a=n.children.find((function(e){return e.key===t})).children.find((function(e){return e.key===r})).data.tail;return n.data.graph.edges=[].concat(I(n.data.graph.edges),[{key:r,head:t,tail:a}]),n}function te(e,t,r){var n=P({},e,{data:P({},e.data,{graph:P({},e.data.graph,{edges:I(e.data.graph.edges)})})});return n.data.graph.edges=n.data.graph.edges.filter((function(e){return e.key!==r||e.head!==t})),n}function re(e){var t=e.key;return function(e){return P({},e,{data:P({},e.data,{graph:{nodes:e.data.graph.nodes.filter((function(e){return e.key!==t})),edges:e.data.graph.edges.filter((function(e){return e.tail!==t&&e.head!==t}))}})})}}function ne(e){var t=e.data,r=e.location;return function(e){var n=ae(e,t=t||{},r),a=n.key;return P({},e,{children:[q(n)].concat(I(e.children.map(B))),data:P({},e.data,{graph:P({},e.data.graph,{nodes:[{key:a,location:r,data:t}].concat(I(e.data.graph.nodes))})})})}}function ae(e,t,r){var n=N(r,2),a=n[0],o=n[1],i=t&&t.width&&t.height?t:{width:1,height:1},c=i.width,u=i.height;c=0===c?1:c,u=0===u?1:u;var d=e.worldMatrix,l=Object(x.transformedByMatrix)({worldMatrix:d},[[c,0,a],[0,u,o],[0,0,1]]),f=Object(x.transformedByMatrix)({type:"in-edge-node",worldMatrix:l.worldMatrix},[[.1/c,0,0],[0,.1/u,.9],[0,0,1]]),s=Object(x.transformedByMatrix)({type:"out-edge-node",key:1,worldMatrix:l.worldMatrix},[[.1/c,0,0],[0,.1/u,-.9],[0,0,1]]);return P({},l,{type:"graph-node",key:F(e),data:P({},t,{clickBox:[-1,-1,1,1]}),children:[f,P({},s,{data:{clickBox:[-1,-1,1,1]}})]})}function oe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}(e,t)||le(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ce(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ie(Object(r),!0).forEach((function(t){ue(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ie(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ue(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function de(e){return function(e){if(Array.isArray(e))return fe(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||le(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function le(e,t){if(e){if("string"==typeof e)return fe(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?fe(e,t):void 0}}function fe(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function se(e){var t=pe(e),r=a.a.merge.apply(a.a,de(Object.keys(t).map((function(e){return t[e]})))),n=e.state,o=t.addNode.map(ne),i=f()(ge,"children")(ce({state:n},t)),c=ve(ce({state:n},t));return{state:a.a.merge(c.state,i.state,o),messages:r,debug:n.stream}}function pe(e){return ce({},ye(e),{},me(e))}function ye(e){var t=e.frameSource,r=e.state,n=e.addNode,o=e.removeNode,c=t.select((function(e){return e&&"graph-node"===e.type})),u=c.events("mousedown").compose(s.singleClick).compose(i()(r.stream)).map((function(e){var t=oe(e,2),r=t[0];return b(t[1],r)})),d=t.select((function(e){return!e})).events("mousedown").compose(s.singleClick).mapTo({type:"deselect-all"}),l=c.events("mousedown").compose(s.createDrag),f=l.map((function(e){return e.take(1).map(O)})).flatten(),p=l.flatten().map(j),y=n.map(S),m=o.filter((function(e){return e})).map(E);return{selectNode:a.a.merge(u,d,f),moveNode:p,addNode:y,removeNode:m}}function me(e){var t=e.frameSource,r=e.state,n=t.select((function(e){return e&&"out-edge-node"===e.type})).events("mousedown").compose(s.createDrag);return{pendingEdge:n.flatten().compose(i()(r.stream)).map((function(e){var t=oe(e,2),r=t[0];return k(t[1],r)})),updateEdges:n.map((function(e){return e.filter((function(e){return"mouseup"===e.type})).compose(u()(0))})).flatten().compose(i()(r.stream)).map((function(e){var t=oe(e,2),r=t[0];return w(t[1],r)}))}}function ge(e){var t=e.selectNode.map(_),r=e.moveNode.map(U),n=e.removeNode.map(L),o=Object(d.makeCollection)({item:he,itemKey:function(e){return e.key},itemScope:function(e){return e},collectSinks:function(e){return{state:e.pickMerge("state")}}})(e);return{state:a.a.merge(t,r,n,o.state)}}function he(e){var t=e.pendingEdge.compose(i()(e.state.stream)).filter((function(e){var t=oe(e,2),r=t[0],n=t[1];return r.nodeKey===n.key})).map((function(e){return $(oe(e,1)[0])})),r=e.updateEdges.compose(i()(e.state.stream)).filter((function(e){var t=oe(e,2),r=t[0],n=t[1];return r.nodeKey===n.key})).map((function(e){return W(oe(e,1)[0])}));return{state:a.a.merge(t,r)}}function ve(e){var t=e.moveNode.map(Q),r=e.updateEdges.map(V),n=e.removeNode.map(re);return{state:a.a.merge(t,r,n)}}function be(e){return function(e){if(Array.isArray(e))return Oe(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Oe(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Oe(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Oe(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function je(e,t,r){var n=r||{},a=n.activeBorder,o=n.selectedBorder,i=n.deselectedBorder,c=n.fillStyle,u=n.inFillStyle,d=n.outFillStyle;e.strokeStyle=t.data.active?a||"yellow":t.data.selected?o||"#cc7f19":i||"black",e.fillStyle=c||"rgba(255, 255, 255, 0.8)",Object(s.renderBox)(e,t,{fill:!0,stroke:!0}),t.children.forEach((function(t){e.fillStyle="in-edge-node"===t.type?u||"rgba(255, 200, 0, 1)":d||"rgba(0, 255, 200, 1)",Object(s.renderBox)(e,t,{fill:!0,stroke:!0})}))}function ke(e,t,r,n){var a=n||{},o=a.toColor,i=a.tailColor;if("out-edge-node"===r.type)if(r.data&&r.data.to)e.strokeStyle=o||"#DDD",e.beginPath(),e.moveTo.apply(e,be(Object(x.locFrameTrans)([0,0],r,x.identityFrame))),e.lineTo.apply(e,be(r.data.to)),e.stroke();else if(r.data&&r.data.tail){e.strokeStyle=i||"#AAA";var c=t.children.find((function(e){return e.key===r.data.tail}));e.beginPath(),e.moveTo.apply(e,be(Object(x.locFrameTrans)([0,0],r,x.identityFrame))),e.lineTo.apply(e,be(Object(x.locFrameTrans)([0,0],c.children[0],x.identityFrame))),e.stroke()}}function we(e,t,r){e.lineWidth=3,t.children.forEach((function(n){return n.children.forEach((function(n){return ke(e,t,n,r)}))})),e.lineWidth=1,t.children.slice(0).reverse().forEach((function(t){return je(e,t,r)}))}t.default={PlanarGraph:se,GraphIntent:pe,NodeIntent:ye,EdgeIntent:me,NodeFrames:ge,NodeFrame:he,Graph:ve,deselectMessage:v,selectionMessage:b,dragSelectMessage:O,moveNodesMessage:j,pendingEdgeMessage:k,updateEdgesMessage:w,addNodeMessage:S,removeNodeMessage:E,newKey:F,castGraph:K,castGraphFrame:T,deselected:B,inactive:C,selected:q,selectNode:_,moveNode:U,pendingEdge:$,updateEdges:W,deletedEdge:X,addedEdge:Y,updatedEdge:z,scoot:H,newEdge:J,removeNode:L,moveGraphNode:Q,createDisplacer:R,updateGraphEdges:V,edittedGraphEdge:Z,addedGraphEdge:ee,deletedGraphEdge:te,removeGraphNode:re,addNode:ne,createNodeFrame:ae,renderNode:je,renderEdge:ke,renderGraph:we}}]);