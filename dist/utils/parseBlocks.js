import { parse } from '@wordpress/block-serialization-default-parser';
import Block from '../components/Block';

/**
 * Parse Gutenberg blocks from HTML markup.
 *
 * @param {string} html - markup rendered by Gutenberg editor.
 * @returns {JSX.Element[]}
 */
const parseBlocks = html => parse(html.trim()).map((block, key) => /*#__PURE__*/React.createElement(Block, {
  block: block,
  key: key
}));
export default parseBlocks;