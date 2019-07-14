const ffs = require( './filesystem' );
const File = require( './file' );
const pppath = require( 'path-browserify' );

class Shell
{
	constructor( filesystem )
	{
		this.filesystem = filesystem;
		this.currentDirectory = this.filesystem.root;
	}

	cd( pathname )
	{
		let absolutePathname = pathname;
		if( !pppath.isAbsolute( pathname ) )
		{
			absolutePathname = pppath.join( this.currentDirectory.path, pathname );
		}

		let currentDirectory = this.filesystem.getNodeFromPath( absolutePathname );
		if( currentDirectory instanceof File )
		{
			throw new Error( `not a directory: ${pathname}` );
		}

		this.currentDirectory = currentDirectory;
	}

	execute( { command, args=[] } )
	{
		let output = [];

		switch( command )
		{
			case 'cd':
				try
				{
					this.cd( args[0] );
				}
				catch( error )
				{
					output.push( `cd: ${error.message}` );
				}

				break;

			case 'echo':
				output.push( args.join( ' ' ) );
				break;

			case 'pwd':
				output.push( this.currentDirectory.path );
				break;

			default:
				output.push( `command not found: ${command}` );
				break;
		}

		return output;
	}

	get cwd()
	{
		return this.currentDirectory;
	}

	static parse( input )
	{
		let components = input
			.trim()
			.split( ' ' );

		let hash = {
			command: components.shift(),
			args: components,
		};

		return hash;
	}
}

module.exports = Shell;
