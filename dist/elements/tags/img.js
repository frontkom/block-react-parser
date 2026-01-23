import { jsx as _jsx } from "react/jsx-runtime";
export default function Image(_ref) {
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
  return /*#__PURE__*/_jsx("img", {
    alt: alt,
    className: className,
    src: src,
    width: width,
    height: height
  });
}