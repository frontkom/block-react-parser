"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customTags = exports.customBlocks = exports.coreTags = exports.coreBlocks = void 0;
var _img = _interopRequireDefault(require("./tags/img"));
var _selfClosing = _interopRequireDefault(require("./tags/selfClosing"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var coreTags = {
  img: function img(_ref) {
    var attribs = _ref.attribs;
    return /*#__PURE__*/React.createElement(_img.default, {
      attribs: attribs
    });
  },
  br: function br(_ref2) {
    var attribs = _ref2.attribs;
    return /*#__PURE__*/React.createElement(_selfClosing.default, {
      attribs: attribs,
      tag: "br"
    });
  },
  hr: function hr(_ref3) {
    var attribs = _ref3.attribs;
    return /*#__PURE__*/React.createElement(_selfClosing.default, {
      attribs: attribs,
      tag: "hr"
    });
  },
  meta: function meta(_ref4) {
    var attribs = _ref4.attribs;
    return null;
  }
  // area: ({attribs}) => <SelfClosing attribs={attribs} tag="area" />,
  // base: ({attribs}) => <SelfClosing attribs={attribs} tag="base" />,
  // col: ({attribs}) => <SelfClosing attribs={attribs} tag="col" />,
  // embed: ({attribs}) => <SelfClosing attribs={attribs} tag="embed" />,
  // input: ({attribs}) => <SelfClosing attribs={attribs} tag="input" />,
  // link: ({attribs}) => <SelfClosing attribs={attribs} tag="link" />,
  // meta: ({attribs}) => <SelfClosing attribs={attribs} tag="meta" />,
  // param: ({attribs}) => <SelfClosing attribs={attribs} tag="param" />,
  // source: ({attribs}) => <SelfClosing attribs={attribs} tag="source" />,
  // track: ({attribs}) => <SelfClosing attribs={attribs} tag="track" />,
  // wbr: ({attribs}) => <SelfClosing attribs={attribs} tag="wbr" />,
};
exports.coreTags = coreTags;
var coreBlocks = {
  // 'core/archives': ({ block }) => doSomething(),
  // 'core/audio': ({ block }) => doSomething(),
  // 'core/avatar': ({ block }) => doSomething(),
  // 'core/block': ({ block }) => doSomething(),
  // 'core/button': ({ block }) => doSomething(),
  // 'core/buttons': ({ block }) => doSomething(),
  // 'core/calendar': ({ block }) => doSomething(),
  // 'core/categories': ({ block }) => doSomething(),
  // 'core/code': ({ block }) => doSomething(),
  // 'core/column': ({ block }) => <p>Column</p>,
  // 'core/columns': ({ block }) => doSomething(),
  // 'core/comment-author-avatar': ({ block }) => doSomething(),
  // 'core/comment-author-name': ({ block }) => doSomething(),
  // 'core/comment-content': ({ block }) => doSomething(),
  // 'core/comment-date': ({ block }) => doSomething(),
  // 'core/comment-edit-link': ({ block }) => doSomething(),
  // 'core/comment-reply-link': ({ block }) => doSomething(),
  // 'core/comment-template': ({ block }) => doSomething(),
  // 'core/comments': ({ block }) => doSomething(),
  // 'core/comments-pagination': ({ block }) => doSomething(),
  // 'core/comments-pagination-next': ({ block }) => doSomething(),
  // 'core/comments-pagination-numbers': ({ block }) => doSomething(),
  // 'core/comments-pagination-previous': ({ block }) => doSomething(),
  // 'core/comments-title': ({ block }) => doSomething(),
  // 'core/cover': ({ block }) => doSomething(),
  // 'core/embed': ({ block }) => doSomething(),
  // 'core/file': ({ block }) => doSomething(),
  // 'core/freeform': ({ block }) => doSomething(),
  // 'core/gallery': ({ block }) => doSomething(),
  // 'core/group': ({ block }) => doSomething(),
  // 'core/heading': ({ block }) => doSomething(),
  // 'core/home-link': ({ block }) => doSomething(),
  // 'core/html': ({ block }) => doSomething(),
  // 'core/image': ({ block }) => doSomething(),
  // 'core/latest-comments': ({ block }) => doSomething(),
  // 'core/latest-posts': ({ block }) => doSomething(),
  // 'core/list': ({ block }) => doSomething(),
  // 'core/list-item': ({ block }) => doSomething(),
  // 'core/loginout': ({ block }) => doSomething(),
  // 'core/media-text': ({ block }) => doSomething(),
  // 'core/missing': ({ block }) => doSomething(),
  // 'core/more': ({ block }) => doSomething(),
  // 'core/navigation': ({ block }) => doSomething(),
  // 'core/navigation-link': ({ block }) => doSomething(),
  // 'core/navigation-submenu': ({ block }) => doSomething(),
  // 'core/nextpage': ({ block }) => doSomething(),
  // 'core/page-list': ({ block }) => doSomething(),
  // 'core/paragraph': ({ block }) => doSomething(),
  // 'core/pattern': ({ block }) => doSomething(),
  // 'core/post-author': ({ block }) => doSomething(),
  // 'core/post-author-biography': ({ block }) => doSomething(),
  // 'core/post-author-name': ({ block }) => doSomething(),
  // 'core/post-comment': ({ block }) => doSomething(),
  // 'core/post-comments-count': ({ block }) => doSomething(),
  // 'core/post-comments-form': ({ block }) => doSomething(),
  // 'core/post-comments-link': ({ block }) => doSomething(),
  // 'core/post-content': ({ block }) => doSomething(),
  // 'core/post-date': ({ block }) => doSomething(),
  // 'core/post-excerpt': ({ block }) => doSomething(),
  // 'core/post-featured-image': ({ block }) => doSomething(),
  // 'core/post-navigation-link': ({ block }) => doSomething(),
  // 'core/post-template': ({ block }) => doSomething(),
  // 'core/post-terms': ({ block }) => doSomething(),
  // 'core/post-title': ({ block }) => doSomething(),
  // 'core/preformatted': ({ block }) => doSomething(),
  // 'core/pullquote': ({ block }) => doSomething(),
  // 'core/query': ({ block }) => doSomething(),
  // 'core/query-no-results': ({ block }) => doSomething(),
  // 'core/query-pagination': ({ block }) => doSomething(),
  // 'core/query-pagination-next': ({ block }) => doSomething(),
  // 'core/query-pagination-numbers': ({ block }) => doSomething(),
  // 'core/query-pagination-previous': ({ block }) => doSomething(),
  // 'core/query-title': ({ block }) => doSomething(),
  // 'core/quote': ({ block }) => doSomething(),
  // 'core/read-more': ({ block }) => doSomething(),
  // 'core/rss': ({ block }) => doSomething(),
  // 'core/search': ({ block }) => doSomething(),
  // 'core/separator': ({ block }) => doSomething(),
  // 'core/shortcode': ({ block }) => doSomething(),
  // 'core/site-logo': ({ block }) => doSomething(),
  // 'core/site-tagline': ({ block }) => doSomething(),
  // 'core/site-title': ({ block }) => doSomething(),
  // 'core/social-link': ({ block }) => doSomething(),
  // 'core/social-links': ({ block }) => doSomething(),
  // 'core/spacer': ({ block }) => doSomething(),
  // 'core/table': ({ block }) => doSomething(),
  // 'core/table-of-contents': ({ block }) => doSomething(),
  // 'core/tag-cloud': ({ block }) => doSomething(),
  // 'core/template-part': ({ block }) => doSomething(),
  // 'core/term-description': ({ block }) => doSomething(),
  // 'core/text-columns': ({ block }) => doSomething(),
  // 'core/verse': ({ block }) => doSomething(),
  // 'core/video': ({ block }) => doSomething(),
};

/**
 * Helper function to setup custom tags definitions.
 *
 * @param {object} tags - Optional object with custom blocks definitions. Empty by default.
 * @returns {object} Object with blocks definitions
 */
exports.coreBlocks = coreBlocks;
var customTags = function customTags() {
  var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread(_objectSpread({}, coreTags), tags);
};

/**
 * Helper function to setup custom blocks definitions.
 *
 * @param {object} blocks - Optional object with custom blocks definitions. Empty by default.
 * @param {boolean} useDefaultBlocks - Optional boolean to use core blocks defaults. True by default.
 * @returns {object} Object with blocks definitions
 */
exports.customTags = customTags;
var customBlocks = function customBlocks() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread(_objectSpread({}, coreBlocks), blocks);
};
exports.customBlocks = customBlocks;