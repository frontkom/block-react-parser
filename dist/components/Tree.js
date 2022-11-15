"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tree;
var _styleToJs = _interopRequireDefault(require("style-to-js"));
var _Context = require("./Context");
var _Block = _interopRequireDefault(require("./Block"));
var _excluded = ["class", "style"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Tree(_ref) {
  var _node$children;
  var node = _ref.node,
    block = _ref.block;
  var CustomTag = (0, _Context.useTagComponent)(node.name);
  if (node.type === 'text') {
    if (node.data === '[innerBlocks]') {
      var _block$innerBlocks;
      // eslint-disable-next-line react/no-array-index-key
      return (_block$innerBlocks = block.innerBlocks) === null || _block$innerBlocks === void 0 ? void 0 : _block$innerBlocks.map(function (inner, index) {
        return /*#__PURE__*/React.createElement(_Block["default"], {
          block: inner,
          key: index
        });
      });
    }
    return node.data;
  }

  // Handle selfclosed elements (???)
  if (CustomTag) {
    return /*#__PURE__*/React.createElement(CustomTag, {
      attribs: node.attribs
    });
  }
  var Component = node.name;
  var _node$attribs = node.attribs,
    className = _node$attribs["class"],
    style = _node$attribs.style,
    attributes = _objectWithoutProperties(_node$attribs, _excluded);
  var attrs = _objectSpread(_objectSpread({}, attributes), {}, {
    className: className || undefined,
    style: style && (0, _styleToJs["default"])(style)
  });
  return /*#__PURE__*/React.createElement(Component, attrs, (_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children.map(function (child, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Tree, {
        node: child,
        block: block,
        key: index
      })
    );
  }));
}