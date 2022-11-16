import convert from 'react-attr-converter';
import parseStyle from 'style-to-js';

const attribsProps = (attribs) => {
  if (attribs === undefined) {
    return {};
  }

  const props = Object.fromEntries(
    Object.entries(attribs).map((attribute) => {
      if (attribute[0] === 'style') {
        return [convert(attribute[0]), parseStyle(attribute[1])];
      }
      return [convert(attribute[0]), attribute[1]];
    })
  );

  return props;
};

export default attribsProps;
