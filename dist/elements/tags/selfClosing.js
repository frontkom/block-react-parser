import parseStyle from 'style-to-js';
export default function SelfClosing({
  attribs,
  tag
}) {
  const Component = tag;
  const {
    class: className,
    ...attributes
  } = attribs;
  if (className) {
    attributes.className = className;
  }
  if (attributes.style) {
    attributes.style = parseStyle(attributes.style);
  }
  return /*#__PURE__*/React.createElement(Component, attributes);
}