import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '@wordpress/block-serialization-default-parser';

const html = `
<!-- wp:columns {"columns":3} -->
<div class="wp-block-columns has-3-columns">
    <!-- wp:column -->
    <div class="wp-block-column">
        <!-- wp:paragraph -->
        <p>Left</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column">
        <!-- wp:paragraph -->
        <p><strong>Middle</strong></p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column"></div>
    <!-- /wp:column -->
</div>
<!-- /wp:columns -->
`;

test('parses columns block structure', () => {
  const blocks = parse(html.trim());
  assert.equal(blocks.length, 1);

  const [columns] = blocks;
  assert.equal(columns.blockName, 'core/columns');
  assert.deepStrictEqual(columns.attrs, { columns: 3 });
  assert.equal(columns.innerBlocks.length, 3);

  const [first, second, third] = columns.innerBlocks;

  assert.equal(first.blockName, 'core/column');
  assert.deepStrictEqual(first.attrs ?? {}, {});
  assert.equal(first.innerBlocks.length, 1);
  assert.equal(first.innerBlocks[0].blockName, 'core/paragraph');
  assert.deepStrictEqual(first.innerBlocks[0].attrs ?? {}, {});
  assert.equal(first.innerBlocks[0].innerBlocks.length, 0);
  assert.equal(first.innerBlocks[0].innerHTML.trim(), '<p>Left</p>');

  assert.equal(second.blockName, 'core/column');
  assert.deepStrictEqual(second.attrs ?? {}, {});
  assert.equal(second.innerBlocks.length, 1);
  assert.equal(second.innerBlocks[0].blockName, 'core/paragraph');
  assert.deepStrictEqual(second.innerBlocks[0].attrs ?? {}, {});
  assert.equal(second.innerBlocks[0].innerBlocks.length, 0);
  assert.equal(second.innerBlocks[0].innerHTML.trim(), '<p><strong>Middle</strong></p>');

  assert.equal(third.blockName, 'core/column');
  assert.deepStrictEqual(third.attrs ?? {}, {});
  assert.equal(third.innerBlocks.length, 0);
});
