import { parseDocument } from 'htmlparser2';
import attribsProps from './attribsProps';

const htmlAttribs = html => {
  const htmlFragment = html?.trim();

  if (htmlFragment && htmlFragment.length > 1) {
    const parsedFragment = parseDocument(htmlFragment, {
      lowerCaseTags: true,
      recognizeSelfClosing: true,
    });
    const attribs = parsedFragment?.children[0]?.attribs;

    if (Object.keys(attribs).length !== 0) {
      return attribsProps(attribs) ?? {};
    }
  }

  return {};
};

export default htmlAttribs;
