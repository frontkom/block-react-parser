"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelfClosing;
var _attribsProps = _interopRequireDefault(require("../../utils/attribsProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SelfClosing(_ref) {
  let {
    attribs,
    tag
  } = _ref;
  const Component = tag;
  const attributes = (0, _attribsProps.default)(attribs);
  return /*#__PURE__*/React.createElement(Component, attributes);
}