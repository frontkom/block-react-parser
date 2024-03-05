import React from 'react';

import Image from './tags/img';
import SelfClosing from './tags/selfClosing';

export const coreTags = {
  img: ({ attribs }) => <Image attribs={attribs} />,
  br: ({ attribs }) => <SelfClosing attribs={attribs} tag="br" />,
  hr: ({ attribs }) => <SelfClosing attribs={attribs} tag="hr" />,
  meta: ({ attribs }) => null,
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

export const coreBlocks = {
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
export const customTags = (tags = {}) => ({ ...coreTags, ...tags });

/**
 * Helper function to setup custom blocks definitions.
 *
 * @param {object} blocks - Optional object with custom blocks definitions. Empty by default.
 * @param {boolean} useDefaultBlocks - Optional boolean to use core blocks defaults. True by default.
 * @returns {object} Object with blocks definitions
 */
export const customBlocks = (blocks = {}) => ({ ...coreBlocks, ...blocks });
