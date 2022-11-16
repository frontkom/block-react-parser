"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Image;
function Image(_ref) {
  var attribs = _ref.attribs;
  var _attribs$alt = attribs.alt,
    alt = _attribs$alt === void 0 ? '' : _attribs$alt,
    _attribs$class = attribs.class,
    className = _attribs$class === void 0 ? '' : _attribs$class,
    src = attribs.src,
    height = attribs.height,
    width = attribs.width;
  return /*#__PURE__*/React.createElement("img", {
    alt: alt,
    className: className,
    src: src,
    width: width,
    height: height
  });
}