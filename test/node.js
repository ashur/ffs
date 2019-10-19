const assert = require( 'chai' ).assert;
const Directory = require( '../src/directory' );
const Node = require( '../src/node' );

describe( 'Node', function()
{
	describe( '#basename', function()
	{
		it( 'should return string', function()
		{
			let node = new Node( 'foo.txt', '/home/ashur' );
			assert.equal( node.basename, 'foo.txt' );
		});
	});

	describe( '#dirname', function()
	{
		it( 'should default to empty string', function()
		{
			let node = new Node( "foo.txt" );
			assert.equal( node.dirname, "" );
		});

		it( 'should return string', function()
		{
			let node = new Node( 'foo.txt', '/home/ashur' );
			assert.equal( node.dirname, '/home/ashur' );
		});
	});

	describe( '#path', function()
	{
		it( 'should return string', function()
		{
			let node = new Node( 'foo.txt', '/home/ashur' );
			assert.equal( node.path, '/home/ashur/foo.txt' );
		});
	});
});
