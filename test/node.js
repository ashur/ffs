const assert = require( 'chai' ).assert;
const Node = require( '../src/node' );

describe( 'Node', function()
{
	describe( '#dir', function()
	{
		it( 'should be null by default', function()
		{
			let node = new Node( 'ashur' );
			assert.isNull( node.dir );
		});
	});

	describe( '#base', function()
	{
		it( 'should be set by constructor', function()
		{
			let node = new Node( 'ashur' );
			assert.equal( node.base, 'ashur' );
		});
	});

	describe( '#readable', function()
	{
		it( 'should be true by default', function()
		{
			let node = new Node( 'ashur' );
			assert.equal( node.readable, true );
		});

		it( 'should be set by constructor', function()
		{
			let node = new Node( 'ashur', false );
			assert.equal( node.readable, false );
		});
	});

	describe( '#path', function()
	{
		it( 'should throw exception if dir undefined', function()
		{
			let node = new Node( 'ashur' );
			assert.throws( () =>
			{
				node.path
			});
		});

		it( 'should join base and dir', function()
		{
			let node = new Node( 'ashur' );
			node.dir = '/home';

			assert.equal( node.path, `/home/ashur` )
		});
	});
});
