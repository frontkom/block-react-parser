"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelfClosing;
var _attribsProps = _interopRequireDefault(require("../../utils/attribsProps"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SelfClosing(_ref) {
  let {
    attribs,
    tag
  } = _ref;
  const Component = tag;
  const attributes = (0, _attribsProps.default)(attribs);
  return /*#__PURE__*/React.createElement(Component, attributes);
}