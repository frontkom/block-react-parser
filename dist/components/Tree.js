"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;
var _Context = require("./Context.js");
var _Block = _interopRequireDefault(require("./Block.js"));
var _attribsProps = _interopRequireDefault(require("../utils/attribsProps.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-unused-vars

function Tree(_ref) {
  let {
    node,
    block
  } = _ref;
  const CustomTag = (0, _Context.useTagComponent)(node.name);
  (0, _attribsProps.default)(node.attribs);
  if (node.type === "text") {
    // The [innerBlocks] marker may share its text node with block content,
    // e.g. a list item with a nested list: "<li>Some item[innerBlocks]</li>".
    if (node.data.includes("[innerBlocks]")) {
      const [before, after] = node.data.split("[innerBlocks]");
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [before.trim() ? before : null, block.innerBlocks?.map((inner, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Block.default, {
          block: inner
        }, index)), after.trim() ? after : null]
      });
    }
    return node.data;
  }
  if (CustomTag) {
    const children = node.children?.map((child, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Tree, {
      node: child,
      block: block
    }, index));
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomTag, {
      attribs: node.attribs,
      node: children,
      block: block
    });
  }

  // Component is used as a dynamic tag name in JSX
  // eslint-disable-next-line no-unused-vars
  const Component = node.name;
  const attrs = (0, _attribsProps.default)(node.attribs);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ...attrs,
    children: node.children?.map((child, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Tree, {
      node: child,
      block: block
    }, index))
  });
}