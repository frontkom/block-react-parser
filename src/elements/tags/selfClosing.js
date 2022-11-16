import attribsProps from '../../utils/attribsProps';

export default function SelfClosing({ attribs, tag }) {
  const Component = tag;
  const attributes = attribsProps(attribs);

  return <Component {...attributes} />;
}
