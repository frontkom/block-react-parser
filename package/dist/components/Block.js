"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Block;
var _react = _interopRequireDefault(require("react"));
var _Tree = _interopRequireDefault(require("./Tree"));
var _innerNode = _interopRequireDefault(require("../utils/innerNode"));
var _Context = require("./Context");
var _htmlAttribs = _interopRequireDefault(require("../utils/htmlAttribs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Block element.
 *
 * @param {object} componentProps - properties that includes the block object.
 * @returns {JSX.Element | null | undefined}
 */
function Block(_ref) {
  let {
    block
  } = _ref;
  const {
    blockName = null,
    innerContent,
    innerBlocks
  } = block;
  const CustomBlock = (0, _Context.useBlockComponent)(blockName);
  const htmlAttrs = (0, _htmlAttribs.default)(innerContent[0]);
  const blockExtended = {
    ...block,
    htmlAttrs
  };
  if (CustomBlock) {
    return /*#__PURE__*/_react.default.createElement(CustomBlock, {
      block: blockExtended
    });
  }

  // Filter out empty blocks.
  if (!blockName && innerContent.length === 0) {
    return null;
  }
  // Filter out empty lines and orphaned closing tags.
  if (innerContent.length === 1 && (innerContent[0] === '\n' || innerContent[0].substring(0, 2) === '</')) {
    return null;
  }
  const node = (0, _innerNode.default)(innerBlocks, innerContent);
  if (node) {
    return /*#__PURE__*/_react.default.createElement(_Tree.default, {
      node: node,
      block: blockExtended
    });
  }
  return null;
}