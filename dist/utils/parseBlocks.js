import { parse } from "@wordpress/block-serialization-default-parser";
// eslint-disable-next-line no-unused-vars
import Block from "../components/Block.js";

/**
 * Parse Gutenberg blocks from HTML markup.
 *
 * @param {string} html - markup rendered by Gutenberg editor.
 * @returns {JSX.Element[]}
 */
import { jsx as _jsx } from "react/jsx-runtime";
const parseBlocks = html => parse(html.trim()).map((block, key) => /*#__PURE__*/_jsx(Block, {
  block: block
}, key));
export default parseBlocks;