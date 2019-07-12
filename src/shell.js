const ffs = require( './filesystem' );
const File = require( './file' );
const pppath = require( 'path-browserify' );

class Shell
{
	constructor( filesystem )
	{
		this.filesystem = filesystem;
		this.currentDirectory = this.filesystem.root;
	}

	cd( pathname )
	{
		let absolutePathname = pathname;
		if( !pppath.isAbsolute( pathname ) )
		{
			absolutePathname = pppath.join( this.currentDirectory.path, pathname );
		}

		let currentDirectory = this.filesystem.getNodeFromPath( absolutePathname );
		if( currentDirectory instanceof File )
		{
			throw new Error( 'Not a directory' );
		}

		this.currentDirectory = currentDirectory;
	}

	get cwd()
	{
		return this.currentDirectory;
	}
}

module.exports = Shell;
