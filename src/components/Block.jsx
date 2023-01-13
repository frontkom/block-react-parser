import React from 'react';
import Tree from './Tree';
import innerNode from '../utils/innerNode';
import { useBlockComponent } from './Context';
import htmlAttribs from '../utils/htmlAttribs';

/**
 * Block element.
 *
 * @param {object} componentProps - properties that includes the block object.
 * @returns {JSX.Element | null | undefined}
 */
export default function Block({ block }) {
  const { blockName = null, innerContent, innerBlocks } = block;
  const CustomBlock = useBlockComponent(blockName);

  const htmlAttrs = htmlAttribs(innerContent[0]);
  const blockExtended = { ...block, htmlAttrs };

  if (CustomBlock) {
    return <CustomBlock block={blockExtended} />;
  }

  // Filter out empty blocks.
  if (!blockName && innerContent.length === 0) {
    return null;
  }
  // Filter out empty lines and orphaned closing tags.
  if (
    innerContent.length === 1 &&
    (innerContent[0] === '\n' || innerContent[0].substring(0, 2) === '</')
  ) {
    return null;
  }

  const node = innerNode(innerBlocks, innerContent);
  if (node) {
    return <Tree node={node} block={blockExtended} />;
  }

  return null;
}
