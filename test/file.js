const assert = require( 'chai' ).assert;
const File = require( '../src/file' );

describe( 'File', function()
{
	describe( '#contents', function()
	{
		it( 'should be an empty string by default', function()
		{
			let file = new File( 'foo.md' );
			assert.equal( file.contents, '' );
		});
	});
});
