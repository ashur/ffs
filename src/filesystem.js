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
			throw new Error( 'absolute path required, relative given' );
		}

		/* Don't include empty segments produced by leading and trailing slashes */
		let pathSegments = pathname.split( '/' )
			.filter( segment => segment !== '' );

		let currentNode = this.root;
		for( let pathSegment of pathSegments )
		{
			if( currentNode.find )
			{
				let nextNode = currentNode.find( pathSegment );
				if( nextNode === undefined )
				{
					throw new Error( `no such file or directory: ${pathname}` );
				}

				currentNode = nextNode;
			}
		}

		return currentNode;
	}
}

module.exports = FileSystem;
