"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Block;
var _Tree = _interopRequireDefault(require("./Tree"));
var _innerNode = _interopRequireDefault(require("../utils/innerNode"));
var _Context = require("./Context");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  if (CustomBlock) {
    return /*#__PURE__*/React.createElement(CustomBlock, {
      block: block
    });
  }

  // Filter out empty blocks.
  if (!blockName && innerContent.length === 0) {
    return null;
  }
  // Filter out empty lines and orphaned closing tags.
  if (innerContent.length === 1 && (innerContent[0] === "\n" || innerContent[0].substring(0, 2) === "</")) {
    return null;
  }
  const node = (0, _innerNode.default)(innerBlocks, innerContent);
  if (node) {
    return /*#__PURE__*/React.createElement(_Tree.default, {
      node: node,
      block: block
    });
  }
  return null;
}