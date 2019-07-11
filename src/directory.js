const Node = require( './node' );

class Directory extends Node
{
	constructor( base )
	{
		super( base );

		this.nodes = [];
	}

	/**
	 * Add Node object to nodes array
	 *
	 * @param Node node
	 */
	addNode( node )
	{
		if( this.findNode( node.base ) !== undefined )
		{
			throw new Error( 'File exists' );
		}

		node.dir = this.path;
		this.nodes.push( node );
		return node;
	}

	/**
	 * Returns the Node object whose basename matches the `base` parameter.
	 * 
	 * @param string base
	 * @return Node
	 */
	findNode( base )
	{
		return this.nodes.find( node => node.base === base );
	}
}

module.exports = Directory;
