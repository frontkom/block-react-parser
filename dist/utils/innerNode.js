import { parseDocument } from 'htmlparser2';
const innerNode = (innerBlocks, innerContent) => {
  // If no inner blocks, return the block markup.
  // If inner blocks, return the wrapping markup.
  const html = !innerBlocks.length ? innerContent[0] : `${innerContent[0]}[innerBlocks]${innerContent[innerContent.length - 1]}`;
  const tree = parseDocument(html.trim(), {
    lowerCaseTags: true,
    recognizeSelfClosing: true
  });
  return tree.children[0] ?? null;
};
export default innerNode;