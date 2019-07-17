const assert = require( 'chai' ).assert;
const Directory = require( '../src/directory' );
const File = require( '../src/file' );

describe( 'File', function()
{
	describe( '#parent', function()
	{
		it( 'should return Directory object', function()
		{
			let node = new File( 'foo.txt', '/home/ashur' );
			assert.instanceOf( node.parent, Directory );
			assert.equal( node.parent.path, '/home/ashur' );
		});
	});

	describe( '#contents', function()
	{
		it( 'should be an empty string by default', function()
		{
			let file = new File( 'foo.md' );
			assert.equal( file.contents, '' );
		});
	});
});
