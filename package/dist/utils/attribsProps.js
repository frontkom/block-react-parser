"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactAttrConverter = _interopRequireDefault(require("react-attr-converter"));
var _styleToJs = _interopRequireDefault(require("style-to-js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var attribsProps = function attribsProps(attribs) {
  if (attribs === undefined) {
    return {};
  }
  var props = Object.fromEntries(Object.entries(attribs).map(function (attribute) {
    if (attribute[0] === 'style') {
      return [(0, _reactAttrConverter.default)(attribute[0]), (0, _styleToJs.default)(attribute[1])];
    }
    return [(0, _reactAttrConverter.default)(attribute[0]), attribute[1]];
  }));
  return props;
};
var _default = attribsProps;
exports.default = _default;