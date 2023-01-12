"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _htmlparser = require("htmlparser2");
var innerNode = function innerNode(innerBlocks, innerContent) {
  var _tree$children$;
  // If no inner blocks, return the block markup.
  // If inner blocks, return the wrapping markup.
  var innerHtml = !innerBlocks.length ? innerContent[0] : "".concat(innerContent[0], "[innerBlocks]").concat(innerContent[innerContent.length - 1]);
  var html = innerHtml ? innerHtml.trim() : '';
  var tree = (0, _htmlparser.parseDocument)(html, {
    lowerCaseTags: true,
    recognizeSelfClosing: true
  });
  return (_tree$children$ = tree.children[0]) !== null && _tree$children$ !== void 0 ? _tree$children$ : null;
};
var _default = innerNode;
exports.default = _default;