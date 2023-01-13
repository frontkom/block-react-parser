"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;
var _react = _interopRequireDefault(require("react"));
var _Context = require("./Context");
var _Block = _interopRequireDefault(require("./Block"));
var _attribsProps = _interopRequireDefault(require("../utils/attribsProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Tree(_ref) {
  var _node$children2;
  var node = _ref.node,
    block = _ref.block;
  var CustomTag = (0, _Context.useTagComponent)(node.name);
  (0, _attribsProps.default)(node.attribs);
  if (node.type === 'text') {
    if (node.data === '[innerBlocks]') {
      var _block$innerBlocks;
      // eslint-disable-next-line react/no-array-index-key
      return (_block$innerBlocks = block.innerBlocks) === null || _block$innerBlocks === void 0 ? void 0 : _block$innerBlocks.map(function (inner, index) {
        return /*#__PURE__*/_react.default.createElement(_Block.default, {
          block: inner,
          key: index
        });
      });
    }
    return node.data;
  }

  // Handle selfclosed elements (???)
  if (CustomTag) {
    var _node$children;
    var tagChildren = (_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children.map(function (child, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react.default.createElement(Tree, {
          node: child,
          block: block,
          key: index
        })
      );
    });
    return /*#__PURE__*/_react.default.createElement(CustomTag, {
      node: tagChildren,
      attribs: node.attribs
    });
  }
  var Component = node.name;
  var attrs = (0, _attribsProps.default)(node.attribs);
  return /*#__PURE__*/_react.default.createElement(Component, attrs, (_node$children2 = node.children) === null || _node$children2 === void 0 ? void 0 : _node$children2.map(function (child, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(Tree, {
        node: child,
        block: block,
        key: index
      })
    );
  }));
}