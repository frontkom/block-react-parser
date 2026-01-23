import { useTagComponent } from "./Context";
import Block from "./Block";
import attribsProps from "../utils/attribsProps";

export default function Tree({ node, block }) {
  const CustomTag = useTagComponent(node.name);

  attribsProps(node.attribs);

  if (node.type === "text") {
    if (node.data.trim() === "[innerBlocks]") {
      // eslint-disable-next-line react/no-array-index-key
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
