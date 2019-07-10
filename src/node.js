const pppath = require( 'path-browserify' );

class Node
{
	constructor( base, readable=true )
	{
		this.dir = null;
		this.base = base;
		this.readable = readable;
	}

	get path()
	{
		if( this.dir === null )
		{
			throw new Error( 'dir undefined' );
		}

		return pppath.join( this.dir, this.base );
	}
}

module.exports = Node;
