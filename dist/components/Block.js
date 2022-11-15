"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Block;
var _Tree = _interopRequireDefault(require("./Tree"));
var _innerNode = _interopRequireDefault(require("../utils/innerNode"));
var _Context = require("./Context");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Block element.
 *
 * @param {object} componentProps - properties that includes the block object.
 * @returns {JSX.Element | null | undefined}
 */
function Block(_ref) {
  var block = _ref.block;
  var _block$blockName = block.blockName,
    blockName = _block$blockName === void 0 ? null : _block$blockName,
    innerContent = block.innerContent,
    innerBlocks = block.innerBlocks;
  var CustomBlock = (0, _Context.useBlockComponent)(blockName);
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
  if (innerContent.length === 1 && (innerContent[0] === '\n' || innerContent[0].substring(0, 2) === '</')) {
    return null;
  }
  var node = (0, _innerNode["default"])(innerBlocks, innerContent);
  if (node) {
    return /*#__PURE__*/React.createElement(_Tree["default"], {
      node: node,
      block: block
    });
  }
}