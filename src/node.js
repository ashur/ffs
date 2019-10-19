const pppath = require( 'path-browserify' );
const Directory = require( './directory' );

class Node
{
	constructor( basename, dirname="", readable=true )
	{
		this.basename = basename;
		this.dirname = dirname;
		this.readable = readable;
	}

	get path()
	{
		return pppath.join( this.dirname, this.basename );
	}

	/**
	 * Set dirname
	 * @param {String} dirname
	 * @see Directory.setDirname
	 */
	setDirname( dirname )
	{
		this.dirname = dirname;
	}
}

module.exports = Node;
