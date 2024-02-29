"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelfClosing;
var _attribsProps = _interopRequireDefault(require("../../utils/attribsProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SelfClosing(_ref) {
  var attribs = _ref.attribs,
    tag = _ref.tag;
  var Component = tag;
  var attributes = (0, _attribsProps.default)(attribs);
  return /*#__PURE__*/React.createElement(Component, attributes);
}