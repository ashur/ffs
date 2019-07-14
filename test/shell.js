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

			assert.throws( () =>
			{
				shell.cd( 'invalid' );
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

	describe( '#parse', function()
	{
		it( 'should return hash', function()
		{
			let hash = Shell.parse( 'cd home/ashur ' );
			assert.deepEqual( hash, {
				command: 'cd',
				args: [
				    'home/ashur'
				]
			});
		});
	});

	describe( '#execute', function()
	{
		it( 'should output an error if command is not found', function()
		{
			let shell = new Shell( new FileSystem() );

			let hash = { command: 'foo' };
			let expectedOutput = [`command not found: ${hash.command}`];

			assert.deepEqual( shell.execute( hash ), expectedOutput );
		});

		context( 'cd', function()
		{
			it( 'should change working directory', function()
			{
				let filesystem = new FileSystem();

				filesystem.root
					.add( new Directory( 'home' ) )
					.add( new Directory( 'ashur' ) )

				let hash = {
					command: 'cd',
					args: [ 'home/ashur' ]
				};

				let shell = new Shell( filesystem );
				assert.deepEqual( shell.execute( hash ), [] );

				assert.equal( shell.cwd.path, '/home/ashur' );
			});
		})

		context( 'echo', function()
		{
			it( 'should output a line of text', function()
			{
				let hash = {
					command: 'echo',
					args: [ 'hello', 'world', ]
				};

				let shell = new Shell( new FileSystem() );
				let expectedOutput = ['hello world'];

				assert.deepEqual( shell.execute( hash ), expectedOutput );
			});
		});

		context( 'pwd', function()
		{
			it( 'should output working directory path', function()
			{
				let hash = { command: 'pwd' };

				let filesystem = new FileSystem();

				filesystem.root
					.add( new Directory( 'home' ) )
					.add( new Directory( 'ashur' ) )

				let shell = new Shell( filesystem );

				assert.deepEqual( shell.execute( hash ), ['/'] );

				shell.cd( 'home' );
				assert.deepEqual( shell.execute( hash ), ['/home'] );

				shell.cd( 'ashur' );
				assert.deepEqual( shell.execute( hash ), ['/home/ashur'] );
			});
		});
	});
});
