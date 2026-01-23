"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = void 0;
exports.useBlockComponent = useBlockComponent;
exports.useComponentContext = useComponentContext;
exports.useTagComponent = useTagComponent;
var _react = require("react");
var _index = require("../elements/index.js");
const TxContext = /*#__PURE__*/(0, _react.createContext)();
const {
  Provider
} = TxContext;
exports.Provider = Provider;
function useComponentContext() {
  return (0, _react.useContext)(TxContext);
}
function useBlockComponent(name) {
  const {
    CustomBlocks = _index.coreBlocks
  } = (0, _react.useContext)(TxContext);
  return name && CustomBlocks[name];
}
function useTagComponent(tag) {
  const {
    CustomTags = _index.coreTags
  } = (0, _react.useContext)(TxContext);
  return tag && CustomTags[tag];
}