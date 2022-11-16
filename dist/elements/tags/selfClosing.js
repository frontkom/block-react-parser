"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelfClosing;
var _styleToJs = _interopRequireDefault(require("style-to-js"));
var _excluded = ["class"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function SelfClosing(_ref) {
  var attribs = _ref.attribs,
    tag = _ref.tag;
  var Component = tag;
  var className = attribs.class,
    attributes = _objectWithoutProperties(attribs, _excluded);
  if (className) {
    attributes.className = className;
  }
  if (attributes.style) {
    attributes.style = (0, _styleToJs.default)(attributes.style);
  }
  return /*#__PURE__*/React.createElement(Component, attributes);
}