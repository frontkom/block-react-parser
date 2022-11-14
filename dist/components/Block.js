import Tree from './Tree';
import innerNode from '../utils/innerNode';
import { useBlockComponent } from './Context';

/**
 * Block element.
 *
 * @param {object} componentProps - properties that includes the block object.
 * @returns {JSX.Element | null | undefined}
 */
export default function Block({
  block
}) {
  const {
    blockName = null,
    innerContent,
    innerBlocks
  } = block;
  const CustomBlock = useBlockComponent(blockName);
  if (CustomBlock) {
    return /*#__PURE__*/React.createElement(CustomBlock, {
      block: block
    });
  }

  // Filter out empty blocks.
  if (!blockName && innerContent.length === 0) {
    return null;
  }
  // Filter out empty lines and orphaned closing tags.
  if (innerContent.length === 1 && (innerContent[0] === '\n' || innerContent[0].substring(0, 2) === '</')) {
    return null;
  }
  const node = innerNode(innerBlocks, innerContent);
  if (node) {
    return /*#__PURE__*/React.createElement(Tree, {
      node: node,
      block: block
    });
  }
}