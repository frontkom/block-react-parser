import { useTagComponent } from "./Context.js";
// eslint-disable-next-line no-unused-vars
import Block from "./Block.js";
import attribsProps from "../utils/attribsProps.js";

export default function Tree({ node, block }) {
  const CustomTag = useTagComponent(node.name);

  attribsProps(node.attribs);

  if (node.type === "text") {
    // The [innerBlocks] marker may share its text node with block content,
    // e.g. a list item with a nested list: "<li>Some item[innerBlocks]</li>".
    if (node.data.includes("[innerBlocks]")) {
      const [before, after] = node.data.split("[innerBlocks]");
      return (
        <>
          {before.trim() ? before : null}
          {block.innerBlocks?.map((inner, index) => (
            <Block block={inner} key={index} />
          ))}
          {after.trim() ? after : null}
        </>
      );
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
