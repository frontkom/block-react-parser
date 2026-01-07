"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _blockSerializationDefaultParser = require("@wordpress/block-serialization-default-parser");
var _Block = _interopRequireDefault(require("../components/Block"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Parse Gutenberg blocks from HTML markup.
 *
 * @param {string} html - markup rendered by Gutenberg editor.
 * @returns {JSX.Element[]}
 */
const parseBlocks = html => (0, _blockSerializationDefaultParser.parse)(html.trim()).map((block, key) => /*#__PURE__*/React.createElement(_Block.default, {
  block: block,
  key: key
}));
var _default = exports.default = parseBlocks;