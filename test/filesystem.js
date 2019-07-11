const assert = require( 'chai' ).assert;
const FileSystem = require( '../src/filesystem' );

describe( 'FileSystem', function()
{
	describe( '#getNodeFromPath', function()
	{
		it( 'should throw if path is relative', function()
		{
			let filesystem = new FileSystem();
			assert.throws( () =>
			{
				filesystem.getNodeFromPath( 'home' );
			});
		});
	});
});
