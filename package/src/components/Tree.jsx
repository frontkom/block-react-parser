import { useTagComponent } from "./Context";
import Block from "./Block";
import attribsProps from "../utils/attribsProps";

export default function Tree({ node, block }) {
  const CustomTag = useTagComponent(node.name);

  attribsProps(node.attribs);

  if (node.type === "text") {
    if (node.data === "[innerBlocks]") {
      // eslint-disable-next-line react/no-array-index-key
      return block.innerBlocks?.map((inner, index) => (
        <Block block={inner} key={index} />
      ));
    }

    return node.data;
  }

  // Handle selfclosed elements (???)
  if (CustomTag) {
    return <CustomTag attribs={node.attribs} />;
  }

  const Component = node.name;
  const attrs = attribsProps(node.attribs);

  return (
    <Component {...attrs}>
      {node.children?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Tree node={child} block={block} key={index} />
      ))}
    </Component>
  );
}
