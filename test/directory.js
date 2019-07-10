const assert = require( 'chai' ).assert;
const Directory = require( '../src/directory' );

describe( 'Directory', function()
{
	describe( '#nodes', function()
	{
		it( 'should be an empty array by default', function()
		{
			let directory = new Directory( 'home' );
			assert.deepEqual( directory.nodes, [] );
		});
	});

	describe( '#addNode', function()
	{
		it( 'should add node to nodes array', function()
		{
			let root = new Directory( '' );
			root.dir = '/';

			let home = new Directory( 'home' );
			root.addNode( home );

			assert.equal( root.nodes.length, 1 );
			assert.equal( root.nodes[0], home );
		});

		it( 'should set parent path as child dir', function()
		{
			let home = new Directory( 'home' );
			home.dir = '/';

			let user = new Directory( 'ashur' );
			home.addNode( user );

			assert.equal( user.dir, home.path );
		});
	});

	describe( '#findNode', function()
	{
		it( 'should return undefined if no match found', function()
		{
			let root = new Directory( '' );
			root.dir = '/';

			assert.isUndefined( root.findNode( 'home' ) );
		});

		it( 'should return object with matching basename', function()
		{
			let home = new Directory( 'home' );
			home.dir = '/';

			let ashur = new Directory( 'ashur' );
			home.addNode( ashur );

			let charlie = new Directory( 'charlie' );
			home.addNode( charlie );

			assert.equal( charlie, home.findNode( 'charlie' ) );
		});
	});
});
