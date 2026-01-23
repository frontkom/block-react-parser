import attribsProps from '../../utils/attribsProps.js';
import { jsx as _jsx } from "react/jsx-runtime";
export default function SelfClosing(_ref) {
  let {
    attribs,
    tag
  } = _ref;
  // eslint-disable-next-line no-unused-vars
  const Component = tag;
  const attributes = attribsProps(attribs);
  return /*#__PURE__*/_jsx(Component, {
    ...attributes
  });
}