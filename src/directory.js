const Node = require( './node' );
const pppath = require( 'path-browserify' );

class Directory extends Node
{
	constructor( basename, dirname )
	{
		super( basename, dirname );
		this.nodes = [];
	}

	/**
	 * Add Node object to nodes array
	 *
	 * @param Node node
	 */
	add( node )
	{
		if( this.find( node.basename ) !== undefined )
		{
			throw new Error( 'File exists' );
		}

		node.setDirname( this.path );

		this.nodes.push( node );
		return node;
	}

	/**
	 * Return Node object found described by path
	 * 
	 * @param string pathname
	 * @return Node
	 */
	find( pathname )
	{
		let pathSegments = pathname.split( '/' )
			.filter( segment => segment !== '' ) // Don't include empty segments produced by leading and trailing slashes

		let basename = pathSegments.shift();
		let match = this.nodes.find( node => node.basename === basename );

		if( match )
		{
			if( pathSegments.length > 0 )
			{
				return match.find( pathSegments.join( '/' ) );
			}
			else
			{
				return match;
			}
		}
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

	/**
	 * Set dirname on all Node objects in nodes array
	 * @param String dirname
	 */
	setDirname( dirname )
	{
		super.setDirname( dirname );

		this.nodes.forEach( node =>
		{
			node.setDirname( this.path );
		});
	}
}

module.exports = Directory;
