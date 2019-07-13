const assert = require( 'chai' ).assert;
const Directory = require( '../src/directory' );
const File = require( '../src/file' );
const FileSystem = require( '../src/filesystem' );
const Shell = require( '../src/shell' );

describe( 'Shell', function()
{
	describe( '#cwd', function()
	{
		it( 'should return Directory object', function()
		{
			let filesystem = new FileSystem();
			let shell = new Shell( filesystem );
			assert.instanceOf( shell.cwd, Directory );
		});
	});

	describe( '#cd', function()
	{
		it( 'should throw on invalid path', function()
		{
			let filesystem = new FileSystem();
			let shell = new Shell( filesystem );

			assert.throws( () =>
			{
				shell.cd( '/invalid/path' );
			});
		});

		it( 'should throw if attempting to change to file', function()
		{
			let filesystem = new FileSystem();
			let shell = new Shell( filesystem );

			filesystem.root.add( new File( 'README.md' ) );

			assert.throws( () =>
			{
				shell.cd( '/README.md' );
			});
		});

		it( 'should update cwd on successful change', function()
		{
			let filesystem = new FileSystem();
			let shell = new Shell( filesystem );

			filesystem.root
				.add( new Directory( 'home' ) )
				.add( new Directory( 'ashur' ) )

			shell.cd( '/home/ashur' );
			assert.equal( shell.cwd.path, '/home/ashur', 'change to nested directory' );

			shell.cd( '/' );
			assert.equal( shell.cwd.path, '/', 'change to root' );
		});

		it( 'should support relative targets', function()
		{
			let filesystem = new FileSystem();
			let shell = new Shell( filesystem );
		
			filesystem.root
				.add( new Directory( 'home' ) )
				.add( new Directory( 'ashur' ) )
		
			shell.cd( 'home' );
			assert.equal( shell.cwd.path, '/home' );

			shell.cd( 'ashur' );
			assert.equal( shell.cwd.path, '/home/ashur' );

			shell.cd( '../' );
			assert.equal( shell.cwd.path, '/home' );

			shell.cd( '../' );
			assert.equal( shell.cwd.path, '/' );

			shell.cd( '../' );
			assert.equal( shell.cwd.path, '/' );
		});
	});
});
