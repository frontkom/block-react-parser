"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Image;
var _jsxRuntime = require("react/jsx-runtime");
function Image(_ref) {
  let {
    attribs
  } = _ref;
  const {
    alt = '',
    class: className = '',
    src,
    height,
    width
  } = attribs;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
    alt: alt,
    className: className,
    src: src,
    width: width,
    height: height
  });
}