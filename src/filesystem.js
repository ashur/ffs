const Directory = require( './directory' );

class FileSystem
{
	constructor()
	{
		this.root = new Directory( '' );
		this.root.dir = '/';
	}

	getNodeFromPath( pathname )
	{
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
					throw new Exception( 'No such file or directory' );
				}

				currentNode = nextNode;
			}
		}

		return currentNode;
	}
}

module.exports = FileSystem;
