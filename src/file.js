const Node = require( './node' );

class File extends Node
{
	constructor( base )
	{
		super( base );

		this.contents = '';
	}
}

module.exports = File;
