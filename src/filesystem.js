const Directory = require( './directory' );
const pppath = require( 'path-browserify' );

class FileSystem
{
	constructor()
	{
		this.root = new Directory( '' );
		this.root.dir = '/';
	}

	getNodeFromPath( pathname )
	{
		if( !pppath.isAbsolute( pathname ) )
		{
			throw new Error( 'Absolute path required, relative given' );
		}

		let pathSegments = pathname.split( '/' );
		pathSegments.shift();

		let currentNode = this.root;
		for( let pathSegment of pathSegments )
		{
			if( currentNode.findNode )
			{
				let nextNode = currentNode.findNode( pathSegment );
				if( nextNode === null )
				{
					throw new Error( 'No such file or directory' );
				}

				currentNode = nextNode;
			}
		}

		return currentNode;
	}
}

module.exports = FileSystem;
