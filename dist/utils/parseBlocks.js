"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _blockSerializationDefaultParser = require("@wordpress/block-serialization-default-parser");
var _Block = _interopRequireDefault(require("../components/Block"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Parse Gutenberg blocks from HTML markup.
 *
 * @param {string} html - markup rendered by Gutenberg editor.
 * @returns {JSX.Element[]}
 */
var parseBlocks = function parseBlocks(html) {
  return (0, _blockSerializationDefaultParser.parse)(html.trim()).map(function (block, key) {
    return /*#__PURE__*/React.createElement(_Block.default, {
      block: block,
      key: key
    });
  });
};
var _default = parseBlocks;
exports.default = _default;