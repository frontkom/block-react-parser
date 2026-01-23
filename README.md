# @frontkom/block-react-parser

A Gutenberg-generated HTML to React parser. Converts WordPress block editor (Gutenberg) markup into React components with full support for custom tag and block handlers.

## Features

- **Parses Gutenberg blocks** from WordPress HTML markup
- **Custom handlers** for block types and HTML tags
- **Dynamic component rendering** with proper prop passing
- **React 19 support** with automatic JSX runtime
- **Comprehensive test coverage** (30+ tests)
- **ESLint validated** code quality
- **CI/CD ready** with GitHub Actions

## Installation

Add GitHub Packages to your `.npmrc` (requires a GitHub token with `read:packages` for private repos, or the default `GITHUB_TOKEN` in CI):

```bash
@frontkom:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
npm install @frontkom/block-react-parser
```

## Usage

### Basic Usage

```jsx
import { parseBlocks, Provider, customBlocks, customTags } from '@frontkom/block-react-parser';

function MyComponent({ html }) {
  const blocks = parseBlocks(html);
  
  return (
    <Provider value={{ CustomBlocks: customBlocks(), CustomTags: customTags() }}>
      {blocks}
    </Provider>
  );
}
```

### Custom Block Handlers

Create custom handlers for specific Gutenberg blocks:

```jsx
import { customBlocks, Provider } from '@frontkom/block-react-parser';

const CustomParagraph = ({ block }) => (
  <p className="custom-paragraph">
    {block.innerHTML}
  </p>
);

const handlers = customBlocks({
  'core/paragraph': CustomParagraph
});

function App({ html, blocks }) {
  return (
    <Provider value={{ CustomBlocks: handlers }}>
      {blocks}
    </Provider>
  );
}
```

### Custom Tag Handlers

Create custom handlers for specific HTML tags:

```jsx
import { customTags, Provider } from '@frontkom/block-react-parser';

const CustomImage = ({ attribs, node }) => (
  <figure className="image-wrapper">
    <img {...attribs} />
    {node}
  </figure>
);

const tags = customTags({
  img: CustomImage
});

function App({ blocks }) {
  return (
    <Provider value={{ CustomTags: tags }}>
      {blocks}
    </Provider>
  );
}
```

## API

### `parseBlocks(html: string): JSX.Element[]`

Parses Gutenberg HTML markup and returns an array of React components.

```jsx
const blocks = parseBlocks(gutenbergHtml);
```

### `Block`

The main block rendering component. Used internally but can be imported for custom implementations.

```jsx
import { Block } from '@frontkom/block-react-parser';

<Block block={blockObject} />
```

### `Tree`

The tree rendering component for nested HTML structures. Used internally for rendering block content.

### `Provider`

React Context Provider for passing custom block and tag handlers.

```jsx
<Provider value={{ CustomBlocks: handlers, CustomTags: tags }}>
  {blocks}
</Provider>
```

### `customBlocks(handlers?: Record<string, Component>): Record<string, Component>`

Helper function to create block handlers, merging with core block defaults.

```jsx
const handlers = customBlocks({
  'core/image': MyImageComponent,
  'core/gallery': MyGalleryComponent
});
```

### `customTags(handlers?: Record<string, Component>): Record<string, Component>`

Helper function to create tag handlers, merging with core tag defaults (img, br, hr).

```jsx
const tags = customTags({
  img: MyImageComponent,
  video: MyVideoComponent
});
```

### `attribsProps(attributes: Record<string, any>): Record<string, any>`

Utility function to convert HTML attributes object to React props.

### `innerNode(innerBlocks: Block[], innerContent: string[]): Node`

Utility function to construct a node tree from WordPress inner blocks and content.

## Supported Core Blocks

The parser includes default handlers for most core Gutenberg blocks:

- Image & Gallery
- Paragraphs & Headings
- Lists (ordered and unordered)
- Quotes & Pullquotes
- Code & Preformatted
- Buttons
- Separators & Spacers
- Tables
- Video & Audio
- Groups & Columns
- Cover & Embed
- Media & Text

## Development

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

Compiles source files to `dist/` using Babel.

### Testing

```bash
npm test
```

Runs 30+ tests covering:
- All major block types
- Custom handler overrides
- Edge cases and optional attributes
- Proper component rendering

### Linting

```bash
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix issues
```

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Linting**: ESLint validation on every commit
- **Building**: Babel compilation verification
- **Testing**: Full test suite on Node 20.x
- **Triggers**: Push to main/develop and all pull requests

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for workflow details.

## Browser Support

Targets > 0.25% market share and excludes dead browsers via browserslist.

## License

ISC

## Author

Roberto Ornelas <rob@frontkom.com>
