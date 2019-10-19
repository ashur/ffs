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

		it( 'should set path as dirname of child nodes', function()
		{
			let root = new Directory( "", "/" );
			let home = new Directory( "home" );
			let user = new Directory( "ashur" );
			let bots = new Directory( "bots" );

			user.add( bots );
			assert.equal( bots.dirname, "ashur", "adding 'bots' to 'ashur' should set dirname" );

			home.add( user );
			assert.equal( user.dirname, "home", "adding 'user' to 'home' should set dirname" );
			assert.equal( bots.dirname, "home/ashur", "adding 'user' to 'home' should update 'bots' dirname" );

			root.add( home );
			assert.equal( home.dirname, "/", "adding 'home' to 'root' should set dirname" );
			assert.equal( user.dirname, "/home", "adding 'home' to 'root' should update 'user' dirname" );
			assert.equal( bots.dirname, "/home/ashur", "adding 'home' to 'root' should update 'bots' dirname" );
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
