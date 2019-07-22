/* Turtle class for the Minefield game */

/* Uncomment the console.log 'New position' command to view the turtle's progress
from the console. */

module.exports = class Turtle {

	constructor() {}

	// main class method
	playGame(settings, commands) {

	    let position    = settings.start;
	    let direction   = settings.direction;
	    const width     = settings.boardWidth;
	    const height    = settings.boardHeight;
	    const exit      = settings.exit;
	    const mines     = settings.mines;

	    const moves = commands.steps;

	    // check that initial position is not on a mine, out of bounds or at exit
	    let status = this.checkStatus(position, mines, width, height, exit);

	    if ( status !== 'normal' ){
	    	return '\n' + status;
	    }

	    if ( !this.validateInput(direction) ){
	    	return '\nERROR - Invalid Input Data - Invalid direction';
	    }

	    for ( let i = 0; i < moves.length; i++ ){

	        // if a 'move forward' instruction
	        if ( moves[i] == 'm'){

	            position = this.move(position, direction);
	           	console.log(`\nNew position: ${position}`);

	            /* status changes only after a move forward so check status only here, 
	            not after a rotation */
	            status = this.checkStatus(position, mines, width, height, exit);

			    if ( status !== 'normal' ){
			    	return '\n' + status;
			    }

	        }
	        // if a 'rotate' instruction
	        else if ( moves[i] == 'r') {

	            direction = this.rotate(direction);

	        }
	        // in case of invalid 'move' code, just ignore it 
	        else {
	            console.error(`Invalid move '${moves[i]}' was ignored`);
	        }     

	    }

	    // All moves have been completed & turtle is still within the minefield!
	    return '\nStill in Danger';
	}


	/* 
	More thorough input validation would have been performed with more development time.
	The 'direction' input value is validated as this negates the need
	to have a 'default' clause on the 'switch ( this.direction )' statements in the
	move() and rotate() methods 
	*/
	validateInput(direction){
		return ['north','east','south','west'].includes(direction);
	}

	// check status of turtle's current position
	checkStatus(position, mines, width, height, exit){

	    if ( this.explosion(position, mines) ){ return 'Mine Hit';}
	    else if ( this.outOfBounds(position, height, width) ) { return 'Out of Bounds';}
	    else if ( this.exitReached(position, exit) ) { return 'Success';}
	    else return 'normal';

	}

	// perform a 'move forward once' move
	move(position, direction){

	    let [positionX, positionY] = position;

	    // the direction has been validated prior to this function being called - therefore
	    // it must be one of these 4 valid ones & a return statement is assured. 
	    switch ( direction ) {

	          case 'north':
	            positionY--;
	            break;

	          case 'east':
	            positionX++;
	            break;

	          case 'south':
	            positionY++;
	            break;

	          case 'west':
	            positionX--;
	            break;
	    }

	    return position = [positionX, positionY];
	}

	// perform a 'rotate' move
	rotate(direction){

	    // the direction has been validated prior to this function being called - therefore
	    // it must be one of these 4 valid ones & a return statement is assured. 
	    switch ( direction ) {

	          case 'north': return 'east';

	          case 'east': return 'south';

	          case 'south': return 'west';

	          case 'west': return  'north';
	    }

	}

	// check if turtle is on a mine
	explosion(position, mines){

	    return mines.some( function(ele){
		    return ( ele[0] === position[0] && ele[1] === position[1] );
		});
	}

	// check if the turtle has gone off the board
	outOfBounds(position, height, width){

	    return ( position[0] < 0 || position[0] > (width - 1) || position[1] < 0 
	    	|| position[1] > (height -1) );
	}

	// check if the turtle has successfully reached exit point
	exitReached(position, exit){

	    return ( position[0] === exit[0] && position[1] === exit[1] );

	}

};