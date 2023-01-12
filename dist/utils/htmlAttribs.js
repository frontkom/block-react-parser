"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _htmlparser = require("htmlparser2");
var _attribsProps2 = _interopRequireDefault(require("./attribsProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var htmlAttribs = function htmlAttribs(html) {
  var htmlFragment = html === null || html === void 0 ? void 0 : html.trim();
  if (htmlFragment && htmlFragment.length > 1) {
    var _parsedFragment$child;
    var parsedFragment = (0, _htmlparser.parseDocument)(htmlFragment, {
      lowerCaseTags: true,
      recognizeSelfClosing: true
    });
    var attribs = parsedFragment === null || parsedFragment === void 0 ? void 0 : (_parsedFragment$child = parsedFragment.children[0]) === null || _parsedFragment$child === void 0 ? void 0 : _parsedFragment$child.attribs;
    if (Object.keys(attribs).length !== 0) {
      var _attribsProps;
      return (_attribsProps = (0, _attribsProps2.default)(attribs)) !== null && _attribsProps !== void 0 ? _attribsProps : {};
    }
  }
  return {};
};
var _default = htmlAttribs;
exports.default = _default;