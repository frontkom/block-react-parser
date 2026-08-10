// eslint-disable-next-line no-unused-vars
import Tree from "./Tree.js";
import innerNode from "../utils/innerNode.js";
import { useBlockComponent } from "./Context.js";

/**
 * Block element.
 *
 * @param {object} componentProps - properties that includes the block object.
 * @returns {JSX.Element | null | undefined}
 */
export default function Block({ block }) {
  const { blockName = null, innerContent, innerBlocks } = block;
  const CustomBlock = useBlockComponent(blockName);

  if (CustomBlock) {
    return <CustomBlock block={block} />;
  }

  // Filter out empty blocks.
  if (!blockName && innerContent.length === 0) {
    return null;
  }
  // Filter out empty lines and orphaned closing tags. Note innerContent
  // entries can be null (inner-block position markers), e.g. a container
  // serialized without wrapper markup: <!-- wp:a --><!-- wp:b /--><!-- /wp:a -->
  if (
    innerContent.length === 1 &&
    typeof innerContent[0] === "string" &&
    (innerContent[0] === "\n" || innerContent[0].substring(0, 2) === "</")
  ) {
    return null;
  }

  const node = innerNode(innerBlocks, innerContent);
  if (node) {
    return <Tree node={node} block={block} />;
  }

  return null;
}
