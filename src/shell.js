const ffs = require( './filesystem' );
const File = require( './file' );

class Shell
{
	constructor( filesystem )
	{
		this.filesystem = filesystem;
		this.currentDirectory = this.filesystem.root;
	}

	cd( pathname )
	{
		let currentDirectory = this.filesystem.getNodeFromPath( pathname );

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
