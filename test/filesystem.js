const assert = require( 'chai' ).assert;
const Directory = require( '../src/directory' );
const FileSystem = require( '../src/filesystem' );

describe( 'FileSystem', function()
{
	describe( '#root', function()
	{
		it( 'should be a Directory object', function()
		{
			let filesystem = new FileSystem();
			assert.instanceOf( filesystem.root, Directory );
			assert.equal( filesystem.root.path, '/' );
		});
	});
});
