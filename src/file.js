const Directory = require( './directory' );
const Node = require( './node' );
const pppath = require( 'path-browserify' );

class File extends Node
{
	constructor( basename, dirname )
	{
		super( basename, dirname );
		this.contents = '';
	}

	/**
	 * Return Directory object representing parent
	 * @return Directory
	 */
	get parent()
	{
		let parent = pppath.parse( this.dirname );
		return new Directory( parent.base, parent.dir );
	}
}

module.exports = File;
