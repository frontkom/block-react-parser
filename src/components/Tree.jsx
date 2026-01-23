import { useTagComponent } from "./Context.js";
// eslint-disable-next-line no-unused-vars
import Block from "./Block.js";
import attribsProps from "../utils/attribsProps.js";

export default function Tree({ node, block }) {
  const CustomTag = useTagComponent(node.name);

  attribsProps(node.attribs);

  if (node.type === "text") {
    if (node.data.trim() === "[innerBlocks]") {
      return block.innerBlocks?.map((inner, index) => (
        <Block block={inner} key={index} />
      ));
    }

    return node.data;
  }

  if (CustomTag) {
    const children = node.children?.map((child, index) => (
      <Tree node={child} block={block} key={index} />
    ));
    return <CustomTag attribs={node.attribs} node={children} block={block} />;
  }

  // Component is used as a dynamic tag name in JSX
  // eslint-disable-next-line no-unused-vars
  const Component = node.name;
  const attrs = attribsProps(node.attribs);

  return (
    <Component {...attrs}>
      {node.children?.map((child, index) => (
        <Tree node={child} block={block} key={index} />
      ))}
    </Component>
  );
}
