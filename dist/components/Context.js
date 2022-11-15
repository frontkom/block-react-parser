"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = void 0;
exports.useBlockComponent = useBlockComponent;
exports.useComponentContext = useComponentContext;
exports.useTagComponent = useTagComponent;
var _react = require("react");
var _elements = require("../elements");
var TxContext = /*#__PURE__*/(0, _react.createContext)();
var Provider = TxContext.Provider;
exports.Provider = Provider;
function useComponentContext() {
  return (0, _react.useContext)(TxContext);
}
function useBlockComponent(name) {
  var _useContext = (0, _react.useContext)(TxContext),
    _useContext$CustomBlo = _useContext.CustomBlocks,
    CustomBlocks = _useContext$CustomBlo === void 0 ? _elements.coreBlocks : _useContext$CustomBlo;
  return name && CustomBlocks[name];
}
function useTagComponent(tag) {
  var _useContext2 = (0, _react.useContext)(TxContext),
    _useContext2$CustomTa = _useContext2.CustomTags,
    CustomTags = _useContext2$CustomTa === void 0 ? _elements.coreTags : _useContext2$CustomTa;
  return tag && CustomTags[tag];
}