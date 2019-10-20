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
		let matchingNode = this.nodes.find( node => node.basename === basename );

		if( matchingNode )
		{
			// We haven't exhausted all path segments yet, need to call find again
			if( pathSegments.length > 0 )
			{
				if( matchingNode instanceof Directory )
				{
					return matchingNode.find( pathSegments.join( '/' ) );
				}

				// Attempting to call find on a non-Directory Node will fail
				// ex., "/home/ashur/README.md/foo"
				else
				{
					throw new Error( `'${basename}' is not a directory` );
				}
			}
			else
			{
				return matchingNode;
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
