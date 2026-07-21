import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse } from '@wordpress/block-serialization-default-parser';
import { Block, Provider, customTags, customBlocks } from '../dist/index.js';

/**
 * Helper to render a block with the Provider context
 */
function renderBlock(block, options = {}) {
  const { CustomTags = customTags(), CustomBlocks = customBlocks() } = options;
  return renderToStaticMarkup(
    React.createElement(Provider, { value: { CustomTags, CustomBlocks } },
      React.createElement(Block, { block })
    )
  );
}

/**
 * Helper to parse HTML and render the first block
 */
function parseAndRender(html, options = {}) {
  const blocks = parse(html.trim());
  if (blocks.length === 0) return '';
  return renderBlock(blocks[0], options);
}

test('Block component renders image block', () => {
  const html = `
<!-- wp:image {"id":123,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://example.com/image.jpg" alt="Test image" class="wp-image-123" width="1024" height="768"/></figure>
<!-- /wp:image -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<figure'), 'Should render figure element');
  assert.ok(rendered.includes('class="wp-block-image size-large"'), 'Should preserve figure class');
  assert.ok(rendered.includes('<img'), 'Should render img element');
  assert.ok(rendered.includes('src="https://example.com/image.jpg"'), 'Should preserve src attribute');
  assert.ok(rendered.includes('alt="Test image"'), 'Should preserve alt attribute');
  assert.ok(rendered.includes('class="wp-image-123"'), 'Should preserve img class');
  assert.ok(rendered.includes('width="1024"'), 'Should preserve width attribute');
  assert.ok(rendered.includes('height="768"'), 'Should preserve height attribute');
});

test('Block component renders image with caption', () => {
  const html = `
<!-- wp:image {"id":456} -->
<figure class="wp-block-image"><img src="https://example.com/photo.jpg" alt="Photo"/><figcaption class="wp-element-caption">A beautiful sunset</figcaption></figure>
<!-- /wp:image -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<figcaption'), 'Should render figcaption element');
  assert.ok(rendered.includes('A beautiful sunset'), 'Should render caption text');
  assert.ok(rendered.includes('class="wp-element-caption"'), 'Should preserve figcaption class');
});

test('Block component renders gallery block with nested images', () => {
  const html = `
<!-- wp:gallery {"linkTo":"none","columns":2} -->
<figure class="wp-block-gallery has-nested-images columns-2 is-cropped">
<!-- wp:image {"id":1} -->
<figure class="wp-block-image size-large"><img src="https://example.com/img1.jpg" alt="Image 1" class="wp-image-1"/></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2} -->
<figure class="wp-block-image size-large"><img src="https://example.com/img2.jpg" alt="Image 2" class="wp-image-2"/></figure>
<!-- /wp:image -->
</figure>
<!-- /wp:gallery -->
`;

  const rendered = parseAndRender(html);

  // Gallery wrapper
  assert.ok(rendered.includes('class="wp-block-gallery has-nested-images columns-2 is-cropped"'), 'Should render gallery with classes');

  // First image
  assert.ok(rendered.includes('src="https://example.com/img1.jpg"'), 'Should render first image src');
  assert.ok(rendered.includes('alt="Image 1"'), 'Should render first image alt');

  // Second image
  assert.ok(rendered.includes('src="https://example.com/img2.jpg"'), 'Should render second image src');
  assert.ok(rendered.includes('alt="Image 2"'), 'Should render second image alt');

  // Count figures (1 gallery + 2 images = 3)
  const figureCount = (rendered.match(/<figure/g) || []).length;
  assert.equal(figureCount, 3, 'Should render 3 figure elements (1 gallery + 2 images)');
});

test('Block component renders gallery with image captions', () => {
  const html = `
<!-- wp:gallery {"linkTo":"media"} -->
<figure class="wp-block-gallery has-nested-images">
<!-- wp:image {"id":100} -->
<figure class="wp-block-image"><img src="https://example.com/photo1.jpg" alt="Landscape"/><figcaption>Mountain view</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"id":101} -->
<figure class="wp-block-image"><img src="https://example.com/photo2.jpg" alt="Seascape"/><figcaption>Ocean waves</figcaption></figure>
<!-- /wp:image -->
</figure>
<!-- /wp:gallery -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('Mountain view'), 'Should render first caption');
  assert.ok(rendered.includes('Ocean waves'), 'Should render second caption');

  const figcaptionCount = (rendered.match(/<figcaption/g) || []).length;
  assert.equal(figcaptionCount, 2, 'Should render 2 figcaption elements');
});

test('Block component uses custom block handler for image', () => {
  const html = `
<!-- wp:image {"id":999} -->
<figure class="wp-block-image"><img src="https://example.com/custom.jpg" alt="Custom"/></figure>
<!-- /wp:image -->
`;

  const CustomImage = ({ block }) => {
    return React.createElement('div', { className: 'custom-image-wrapper' },
      React.createElement('span', null, `Image ID: ${block.attrs.id}`)
    );
  };

  const rendered = parseAndRender(html, {
    CustomBlocks: customBlocks({ 'core/image': CustomImage })
  });

  assert.ok(rendered.includes('class="custom-image-wrapper"'), 'Should use custom wrapper');
  assert.ok(rendered.includes('Image ID: 999'), 'Should have access to block attrs');
  assert.ok(!rendered.includes('<figure'), 'Should not render default figure');
});

test('Block component uses custom block handler for gallery', () => {
  const html = `
<!-- wp:gallery {"columns":3} -->
<figure class="wp-block-gallery">
<!-- wp:image {"id":1} -->
<figure class="wp-block-image"><img src="https://example.com/img1.jpg" alt=""/></figure>
<!-- /wp:image -->
</figure>
<!-- /wp:gallery -->
`;

  const CustomGallery = ({ block }) => {
    const imageCount = block.innerBlocks.length;
    return React.createElement('div', { className: 'custom-gallery' },
      React.createElement('p', null, `Gallery with ${imageCount} image(s) and ${block.attrs.columns} columns`)
    );
  };

  const rendered = parseAndRender(html, {
    CustomBlocks: customBlocks({ 'core/gallery': CustomGallery })
  });

  assert.ok(rendered.includes('class="custom-gallery"'), 'Should use custom gallery wrapper');
  assert.ok(rendered.includes('Gallery with 1 image(s) and 3 columns'), 'Should have access to innerBlocks and attrs');
});

test('Block component returns null for empty blocks', () => {
  const emptyBlock = {
    blockName: null,
    attrs: {},
    innerBlocks: [],
    innerHTML: '',
    innerContent: []
  };

  const rendered = renderBlock(emptyBlock);
  assert.equal(rendered, '', 'Should render nothing for empty block');
});

test('Block component handles image without optional attributes', () => {
  const html = `
<!-- wp:image -->
<figure class="wp-block-image"><img src="https://example.com/simple.jpg"/></figure>
<!-- /wp:image -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<img'), 'Should render img element');
  assert.ok(rendered.includes('src="https://example.com/simple.jpg"'), 'Should preserve src');
  assert.ok(rendered.includes('alt=""'), 'Should have empty alt attribute');
});

// ============ Paragraph Block Render Tests ============
test('Block component renders paragraph block', () => {
  const html = `
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Hello world with <strong>bold</strong> and <em>italic</em> text.</p>
<!-- /wp:paragraph -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<p'), 'Should render p element');
  assert.ok(rendered.includes('class="has-text-align-center"'), 'Should preserve class');
  assert.ok(rendered.includes('<strong>bold</strong>'), 'Should render bold text');
  assert.ok(rendered.includes('<em>italic</em>'), 'Should render italic text');
});

// ============ Heading Block Render Tests ============
test('Block component renders heading block', () => {
  const html = `
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Section Title</h2>
<!-- /wp:heading -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<h2'), 'Should render h2 element');
  assert.ok(rendered.includes('Section Title'), 'Should render heading text');
  assert.ok(rendered.includes('class="wp-block-heading"'), 'Should preserve class');
});

test('Block component renders h3 heading', () => {
  const html = `
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Subsection</h3>
<!-- /wp:heading -->
`;

  const rendered = parseAndRender(html);
  assert.ok(rendered.includes('<h3'), 'Should render h3 element');
});

// ============ List Block Render Tests ============
test('Block component renders list with items', () => {
  const html = `
<!-- wp:list -->
<ul class="wp-block-list">
<!-- wp:list-item -->
<li>First item</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Second item</li>
<!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<ul'), 'Should render ul element');
  assert.ok(rendered.includes('<li>First item</li>'), 'Should render first item');
  assert.ok(rendered.includes('<li>Second item</li>'), 'Should render second item');

  const liCount = (rendered.match(/<li>/g) || []).length;
  assert.equal(liCount, 2, 'Should render 2 list items');
});

test('Block component renders ordered list', () => {
  const html = `
<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list">
<!-- wp:list-item -->
<li>Step one</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Step two</li>
<!-- /wp:list-item -->
</ol>
<!-- /wp:list -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<ol'), 'Should render ol element');
  assert.ok(rendered.includes('Step one'), 'Should render first step');
  assert.ok(rendered.includes('Step two'), 'Should render second step');
});

test('Block component renders nested list inside list item', () => {
  // Gutenberg serializes a nested list as inner blocks of a list-item, so the
  // list-item's innerContent is ["<li>Some item", null, "</li>"] and the
  // [innerBlocks] marker ends up in the SAME text node as the item text.
  const html = `
<!-- wp:list -->
<ul class="wp-block-list">
<!-- wp:list-item -->
<li>Some item<!-- wp:list -->
<ul class="wp-block-list">
<!-- wp:list-item -->
<li>A sub item</li>
<!-- /wp:list-item -->
</ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
`;

  const rendered = parseAndRender(html);

  assert.ok(!rendered.includes('[innerBlocks]'), 'Should not leak the [innerBlocks] marker');
  assert.ok(rendered.includes('Some item'), 'Should render parent item text');
  assert.ok(rendered.includes('A sub item'), 'Should render nested item text');

  const ulCount = (rendered.match(/<ul/g) || []).length;
  assert.equal(ulCount, 2, 'Should render nested ul inside the list item');

  const nested = /<li>Some item<ul[^>]*>.*<li>A sub item<\/li>.*<\/ul><\/li>/s;
  assert.ok(nested.test(rendered), 'Nested list should render inside the parent li');
});

// ============ Quote Block Render Tests ============
test('Block component renders quote block', () => {
  const html = `
<!-- wp:quote -->
<blockquote class="wp-block-quote">
<!-- wp:paragraph -->
<p>The only way to do great work is to love what you do.</p>
<!-- /wp:paragraph -->
<cite>Steve Jobs</cite></blockquote>
<!-- /wp:quote -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<blockquote'), 'Should render blockquote element');
  assert.ok(rendered.includes('great work'), 'Should render quote text');
  assert.ok(rendered.includes('<cite>Steve Jobs</cite>'), 'Should render citation');
});

// ============ Code Block Render Tests ============
test('Block component renders code block', () => {
  const html = `
<!-- wp:code -->
<pre class="wp-block-code"><code>const x = 42;</code></pre>
<!-- /wp:code -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<pre'), 'Should render pre element');
  assert.ok(rendered.includes('<code>'), 'Should render code element');
  assert.ok(rendered.includes('const x = 42;'), 'Should render code content');
});

// ============ Preformatted Block Render Tests ============
test('Block component renders preformatted block', () => {
  const html = `
<!-- wp:preformatted -->
<pre class="wp-block-preformatted">  Indented
    text</pre>
<!-- /wp:preformatted -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<pre'), 'Should render pre element');
  assert.ok(rendered.includes('Indented'), 'Should preserve content');
});

// ============ Buttons Block Render Tests ============
test('Block component renders buttons with nested button', () => {
  const html = `
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://example.com">Click Me</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="https://example.com/other">Outline</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('class="wp-block-buttons"'), 'Should render buttons wrapper');
  assert.ok(rendered.includes('Click Me'), 'Should render first button text');
  assert.ok(rendered.includes('Outline'), 'Should render second button text');
  assert.ok(rendered.includes('href="https://example.com"'), 'Should preserve href');
  assert.ok(rendered.includes('is-style-outline'), 'Should preserve outline style class');
});

// ============ Separator Block Render Tests ============
test('Block component renders separator block', () => {
  const html = `
<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<hr'), 'Should render hr element');
  assert.ok(rendered.includes('is-style-wide'), 'Should preserve style class');
});

// ============ Spacer Block Render Tests ============
test('Block component renders spacer block', () => {
  const html = `
<!-- wp:spacer {"height":"100px"} -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<div'), 'Should render div element');
  assert.ok(rendered.includes('wp-block-spacer'), 'Should have spacer class');
  // Style is converted to object, check for height
  assert.ok(rendered.includes('height') || rendered.includes('100px'), 'Should have height style');
});

// ============ Table Block Render Tests ============
test('Block component renders table block', () => {
  const html = `
<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Item 1</td><td>100</td></tr><tr><td>Item 2</td><td>200</td></tr></tbody></table></figure>
<!-- /wp:table -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<table'), 'Should render table element');
  assert.ok(rendered.includes('<thead>'), 'Should render thead');
  assert.ok(rendered.includes('<tbody>'), 'Should render tbody');
  assert.ok(rendered.includes('<th>Name</th>'), 'Should render header cell');
  assert.ok(rendered.includes('<td>Item 1</td>'), 'Should render data cell');
});

// ============ Video Block Render Tests ============
test('Block component renders video block', () => {
  const html = `
<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://example.com/video.mp4"></video></figure>
<!-- /wp:video -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<video'), 'Should render video element');
  assert.ok(rendered.includes('src="https://example.com/video.mp4"'), 'Should preserve src');
  assert.ok(rendered.includes('wp-block-video'), 'Should preserve figure class');
  // Note: Boolean attributes like 'controls' are dropped because htmlparser2
  // represents them as empty strings, which React filters out
});

// ============ Audio Block Render Tests ============
test('Block component renders audio block', () => {
  const html = `
<!-- wp:audio -->
<figure class="wp-block-audio"><audio controls src="https://example.com/audio.mp3"></audio></figure>
<!-- /wp:audio -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<audio'), 'Should render audio element');
  assert.ok(rendered.includes('src="https://example.com/audio.mp3"'), 'Should preserve src');
  assert.ok(rendered.includes('wp-block-audio'), 'Should preserve figure class');
  // Note: Boolean attributes like 'controls' are dropped because htmlparser2
  // represents them as empty strings, which React filters out
});

// ============ Group Block Render Tests ============
test('Block component renders group with nested content', () => {
  const html = `
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading -->
<h2 class="wp-block-heading">Group Title</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Group content.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('class="wp-block-group"'), 'Should render group wrapper');
  assert.ok(rendered.includes('<h2'), 'Should render nested heading');
  assert.ok(rendered.includes('Group Title'), 'Should render heading text');
  assert.ok(rendered.includes('<p>'), 'Should render nested paragraph');
  assert.ok(rendered.includes('Group content.'), 'Should render paragraph text');
});

// ============ Cover Block Render Tests ============
test('Block component renders cover block', () => {
  const html = `
<!-- wp:cover {"url":"https://example.com/cover.jpg","dimRatio":50} -->
<div class="wp-block-cover"><span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span><img class="wp-block-cover__image-background" src="https://example.com/cover.jpg"/><div class="wp-block-cover__inner-container">
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Cover Text</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:cover -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('class="wp-block-cover"'), 'Should render cover wrapper');
  assert.ok(rendered.includes('wp-block-cover__background'), 'Should render background overlay');
  assert.ok(rendered.includes('src="https://example.com/cover.jpg"'), 'Should render cover image');
  assert.ok(rendered.includes('Cover Text'), 'Should render inner content');
});

// ============ Embed Block Render Tests ============
test('Block component renders embed block', () => {
  const html = `
<!-- wp:embed {"url":"https://www.youtube.com/watch?v=abc123","type":"video","providerNameSlug":"youtube"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=abc123
</div></figure>
<!-- /wp:embed -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('wp-block-embed'), 'Should render embed wrapper');
  assert.ok(rendered.includes('is-provider-youtube'), 'Should preserve provider class');
  assert.ok(rendered.includes('youtube.com'), 'Should render embed URL');
});

// ============ Pullquote Block Render Tests ============
test('Block component renders pullquote block', () => {
  const html = `
<!-- wp:pullquote -->
<figure class="wp-block-pullquote"><blockquote><p>A highlighted quote.</p><cite>Author</cite></blockquote></figure>
<!-- /wp:pullquote -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('<figure'), 'Should render figure wrapper');
  assert.ok(rendered.includes('<blockquote>'), 'Should render blockquote');
  assert.ok(rendered.includes('highlighted quote'), 'Should render quote text');
  assert.ok(rendered.includes('<cite>Author</cite>'), 'Should render citation');
});

// ============ Columns Block Render Tests ============
test('Block component renders columns with nested columns', () => {
  const html = `
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:paragraph -->
<p>Left column</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:paragraph -->
<p>Right column</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('class="wp-block-columns"'), 'Should render columns wrapper');
  assert.ok(rendered.includes('class="wp-block-column"'), 'Should render column wrapper');
  assert.ok(rendered.includes('Left column'), 'Should render left column content');
  assert.ok(rendered.includes('Right column'), 'Should render right column content');

  const columnCount = (rendered.match(/wp-block-column"/g) || []).length;
  assert.equal(columnCount, 2, 'Should render 2 columns');
});

// ============ Media & Text Block Render Tests ============
test('Block component renders media-text block', () => {
  const html = `
<!-- wp:media-text {"mediaType":"image"} -->
<div class="wp-block-media-text is-stacked-on-mobile"><figure class="wp-block-media-text__media"><img src="https://example.com/media.jpg" alt="Media"/></figure><div class="wp-block-media-text__content">
<!-- wp:paragraph -->
<p>Text beside media.</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:media-text -->
`;

  const rendered = parseAndRender(html);

  assert.ok(rendered.includes('wp-block-media-text'), 'Should render media-text wrapper');
  assert.ok(rendered.includes('wp-block-media-text__media'), 'Should render media section');
  assert.ok(rendered.includes('wp-block-media-text__content'), 'Should render content section');
  assert.ok(rendered.includes('src="https://example.com/media.jpg"'), 'Should render media image');
  assert.ok(rendered.includes('Text beside media.'), 'Should render text content');
});

// ============ Null Wrapper Markup Tests ============
test('Block component renders inner blocks when wrapper markup is null', () => {
  // A block that only contains inner blocks with no surrounding HTML markup
  // serializes to innerContent === [null, null]. The wrapping markup must not
  // leak the string "null" into the output.
  const block = {
    blockName: 'core/group',
    attrs: {},
    innerBlocks: [
      {
        blockName: 'core/paragraph',
        attrs: {},
        innerBlocks: [],
        innerHTML: '<p>Inner content</p>',
        innerContent: ['<p>Inner content</p>'],
      },
    ],
    innerHTML: '',
    innerContent: [null, null],
  };

  const rendered = renderBlock(block);

  assert.ok(rendered.includes('Inner content'), 'Should render inner block content');
  assert.ok(!rendered.includes('null'), 'Should not leak literal "null" text');
  assert.ok(!rendered.includes('[innerBlocks]'), 'Should not leak the [innerBlocks] marker');
});

// ============ Custom Block Handler Tests ============
test('Block component uses custom handler for paragraph', () => {
  const html = `
<!-- wp:paragraph -->
<p>Original text</p>
<!-- /wp:paragraph -->
`;

  const CustomParagraph = ({ block }) => {
    return React.createElement('div', { className: 'custom-para' }, 'Custom: ' + block.innerHTML.replace(/<[^>]*>/g, '').trim());
  };

  const rendered = parseAndRender(html, {
    CustomBlocks: customBlocks({ 'core/paragraph': CustomParagraph })
  });

  assert.ok(rendered.includes('class="custom-para"'), 'Should use custom wrapper');
  assert.ok(rendered.includes('Custom: Original text'), 'Should transform content');
  assert.ok(!rendered.includes('<p>'), 'Should not render default p element');
});

test('Block component uses custom handler for heading', () => {
  const html = `
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">My Heading</h2>
<!-- /wp:heading -->
`;

  const CustomHeading = ({ block }) => {
    const level = block.attrs?.level || 2;
    return React.createElement(`h${level}`, { className: 'custom-heading', id: 'custom-id' }, 'Custom Heading');
  };

  const rendered = parseAndRender(html, {
    CustomBlocks: customBlocks({ 'core/heading': CustomHeading })
  });

  assert.ok(rendered.includes('class="custom-heading"'), 'Should use custom class');
  assert.ok(rendered.includes('id="custom-id"'), 'Should add custom id');
  assert.ok(rendered.includes('Custom Heading'), 'Should use custom content');
});
