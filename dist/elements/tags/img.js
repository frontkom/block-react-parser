export default function Image({
  attribs
}) {
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