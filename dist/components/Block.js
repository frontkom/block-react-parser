"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Block;
var _Tree = _interopRequireDefault(require("./Tree.js"));
var _innerNode = _interopRequireDefault(require("../utils/innerNode.js"));
var _Context = require("./Context.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-unused-vars

/**
 * Block element.
 *
 * @param {object} componentProps - properties that includes the block object.
 * @returns {JSX.Element | null | undefined}
 */function Block(_ref) {
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomBlock, {
      block: block
    });
  }

  // Filter out empty blocks.
  if (!blockName && innerContent.length === 0) {
    return null;
  }
  // Filter out empty lines and orphaned closing tags. Note innerContent
  // entries can be null (inner-block position markers), e.g. a container
  // serialized without wrapper markup: <!-- wp:a --><!-- wp:b /--><!-- /wp:a -->
  if (innerContent.length === 1 && typeof innerContent[0] === "string" && (innerContent[0] === "\n" || innerContent[0].substring(0, 2) === "</")) {
    return null;
  }
  const node = (0, _innerNode.default)(innerBlocks, innerContent);
  if (node) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tree.default, {
      node: node,
      block: block
    });
  }
  return null;
}