const assert = require( 'chai' ).assert;
const Directory = require( '../src/directory' );

describe( 'Directory', function()
{
	describe( '#parent', function()
	{
		it( 'should return Directory object', function()
		{
			let node = new Directory( 'foo', '/home/ashur' );
			assert.instanceOf( node.parent, Directory );
			assert.equal( node.parent.path, '/home/ashur' );
		});
	});

	describe( '#nodes', function()
	{
		it( 'should be an empty array by default', function()
		{
			let directory = new Directory( 'home' );
			assert.deepEqual( directory.nodes, [] );
		});
	});

	describe( '#add', function()
	{
		it( 'should add node to nodes array', function()
		{
			let root = new Directory( '', '/' );
			let home = new Directory( 'home' );
			root.add( home );

			assert.equal( root.nodes.length, 1 );
			assert.equal( root.nodes[0], home );
		});

		it( 'should set parent path as child dir', function()
		{
			let home = new Directory( 'home', '/' );
			let user = new Directory( 'ashur' );
			home.add( user );

			assert.equal( user.dirname, home.path );
		});

		it( 'should throw if node with matching basename already exists', function()
		{
			let home = new Directory( 'home', '/' );

			home.add( new Directory( 'ashur' ) );
			assert.throws( () =>
			{
				home.add( new Directory( 'ashur' ) );
			});
		});
	});

	describe( '#find', function()
	{
		it( 'should return undefined if no match found', function()
		{
			let root = new Directory( '', '/' );

			assert.isUndefined( root.find( 'home' ) );
		});

		it( 'should return object with matching basename', function()
		{
			let home = new Directory( 'home', '/' );

			let ashur = new Directory( 'ashur' );
			home.add( ashur );

			let charlie = new Directory( 'charlie' );
			home.add( charlie );

			assert.equal( home.find( 'charlie' ), charlie );
		});
	});
});
