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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
  var htmlAttrs = (0, _htmlAttribs.default)(innerContent[0]);
  var blockExtended = _objectSpread(_objectSpread({}, block), {}, {
    htmlAttrs: htmlAttrs
  });
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
  var node = (0, _innerNode.default)(innerBlocks, innerContent);
  if (node) {
    return /*#__PURE__*/_react.default.createElement(_Tree.default, {
      node: node,
      block: blockExtended
    });
  }
  return null;
}