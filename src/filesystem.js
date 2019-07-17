const Directory = require( './directory' );
const pppath = require( 'path-browserify' );

class FileSystem
{
	constructor()
	{
		this.root = new Directory( '', '/' );
	}
}

module.exports = FileSystem;
