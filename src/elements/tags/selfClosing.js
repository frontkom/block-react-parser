import attribsProps from '../../utils/attribsProps.js';

export default function SelfClosing({ attribs, tag }) {
  // eslint-disable-next-line no-unused-vars
  const Component = tag;
  const attributes = attribsProps(attribs);

  return <Component {...attributes} />;
}
