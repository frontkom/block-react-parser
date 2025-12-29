"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Image;
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
  return /*#__PURE__*/React.createElement("img", {
    alt: alt,
    className: className,
    src: src,
    width: width,
    height: height
  });
}