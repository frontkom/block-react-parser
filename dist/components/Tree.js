"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;
var _Context = require("./Context");
var _Block = _interopRequireDefault(require("./Block"));
var _attribsProps = _interopRequireDefault(require("../utils/attribsProps"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Tree(_ref) {
  let {
    node,
    block
  } = _ref;
  const CustomTag = (0, _Context.useTagComponent)(node.name);
  (0, _attribsProps.default)(node.attribs);
  if (node.type === "text") {
    if (node.data === "[innerBlocks]") {
      // eslint-disable-next-line react/no-array-index-key
      return block.innerBlocks?.map((inner, index) => /*#__PURE__*/React.createElement(_Block.default, {
        block: inner,
        key: index
      }));
    }
    return node.data;
  }

  // Handle selfclosed elements (???)
  if (CustomTag) {
    return /*#__PURE__*/React.createElement(CustomTag, {
      attribs: node.attribs
    });
  }
  const Component = node.name;
  const attrs = (0, _attribsProps.default)(node.attribs);
  return /*#__PURE__*/React.createElement(Component, attrs, node.children?.map((child, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement(Tree, {
    node: child,
    block: block,
    key: index
  })));
}