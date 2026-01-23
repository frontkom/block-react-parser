"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;
var _Context = require("./Context");
var _Block = _interopRequireDefault(require("./Block"));
var _attribsProps = _interopRequireDefault(require("../utils/attribsProps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Tree(_ref) {
  let {
    node,
    block
  } = _ref;
  const CustomTag = (0, _Context.useTagComponent)(node.name);
  (0, _attribsProps.default)(node.attribs);
  if (node.type === "text") {
    if (node.data.trim() === "[innerBlocks]") {
      // eslint-disable-next-line react/no-array-index-key
      return block.innerBlocks?.map((inner, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Block.default, {
        block: inner
      }, index));
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
  const Component = node.name;
  const attrs = (0, _attribsProps.default)(node.attribs);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ...attrs,
    children: node.children?.map((child, index) =>
    /*#__PURE__*/
    // eslint-disable-next-line react/no-array-index-key
    (0, _jsxRuntime.jsx)(Tree, {
      node: child,
      block: block
    }, index))
  });
}