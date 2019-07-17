const pppath = require( 'path-browserify' );
const Directory = require( './directory' );

class Node
{
	constructor( basename, dirname, readable=true )
	{
		this.basename = basename;
		this.dirname = dirname;
		this.readable = readable;
	}

	get path()
	{
		return pppath.join( this.dirname, this.basename );
	}
}

module.exports = Node;
