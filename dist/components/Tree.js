import parseStyle from 'style-to-js';
import { useTagComponent } from './Context';
import Block from './Block';
export default function Tree({
  node,
  block
}) {
  const CustomTag = useTagComponent(node.name);
  if (node.type === 'text') {
    if (node.data === '[innerBlocks]') {
      // eslint-disable-next-line react/no-array-index-key
      return block.innerBlocks?.map((inner, index) => /*#__PURE__*/React.createElement(Block, {
        block: inner,
        key: index
      }));
    }
    return node.data;
  }

  // Handle selfclosed elements (???)
  if (CustomTag) {
    return /*#__PURE__*/React.createElement(CustomTag, {
      attribs: node.attribs
    });
  }
  const Component = node.name;
  const {
    class: className,
    style,
    ...attributes
  } = node.attribs;
  const attrs = {
    ...attributes,
    className: className || undefined,
    style: style && parseStyle(style)
  };
  return /*#__PURE__*/React.createElement(Component, attrs, node.children?.map((child, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement(Tree, {
    node: child,
    block: block,
    key: index
  })));
}