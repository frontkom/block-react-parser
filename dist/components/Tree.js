import { useTagComponent } from "./Context.js";
// eslint-disable-next-line no-unused-vars
import Block from "./Block.js";
import attribsProps from "../utils/attribsProps.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Tree(_ref) {
  let {
    node,
    block
  } = _ref;
  const CustomTag = useTagComponent(node.name);
  attribsProps(node.attribs);
  if (node.type === "text") {
    if (node.data.trim() === "[innerBlocks]") {
      return block.innerBlocks?.map((inner, index) => /*#__PURE__*/_jsx(Block, {
        block: inner
      }, index));
    }
    return node.data;
  }
  if (CustomTag) {
    const children = node.children?.map((child, index) => /*#__PURE__*/_jsx(Tree, {
      node: child,
      block: block
    }, index));
    return /*#__PURE__*/_jsx(CustomTag, {
      attribs: node.attribs,
      node: children,
      block: block
    });
  }

  // Component is used as a dynamic tag name in JSX
  // eslint-disable-next-line no-unused-vars
  const Component = node.name;
  const attrs = attribsProps(node.attribs);
  return /*#__PURE__*/_jsx(Component, {
    ...attrs,
    children: node.children?.map((child, index) => /*#__PURE__*/_jsx(Tree, {
      node: child,
      block: block
    }, index))
  });
}