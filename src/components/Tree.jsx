import parseStyle from 'style-to-js';
import { useTagComponent } from './Context';
import Block from './Block';

export default function Tree({ node, block }) {
  const CustomTag = useTagComponent(node.name);

  if (node.type === 'text') {
    if (node.data === '[innerBlocks]') {
      // eslint-disable-next-line react/no-array-index-key
      return block.innerBlocks?.map((inner, index) => <Block block={inner} key={index} />);
    }

    return node.data;
  }

  // Handle selfclosed elements (???)
  if (CustomTag) {
    return <CustomTag attribs={node.attribs} />;
  }

  const Component = node.name;
  const { class: className, style, ...attributes } = node.attribs;
  const attrs = {
    ...attributes,
    className: className || undefined,
    style: style && parseStyle(style),
  };

  return (
    <Component {...attrs}>
      {node.children?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Tree node={child} block={block} key={index} />
      ))}
    </Component>
  );
}
