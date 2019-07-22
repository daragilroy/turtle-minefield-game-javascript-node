Minefield game - turtle tries to navigate around mines and reach the exit successfully. 

The game settings including the board dimensions, the mine positions and the exit position are all configurable via the settings.json file. The turtle's per game instance are set via the moves.jon file.

The current implementation should be run from NodeJS with execution command:
"node turtle.js settings.json moves.json". The code handles successfully the instance where the input files ( settings.json, moves.json ) are listed in reverse order.

Code has been structured so the Turtle.class is stand alone and could run in another environment rather than being Node dependent. The minefield.js file only takes care of input/output to Node.

Turtle.class has been structured to make the functions atomic and suited for unit testing.

As this is a company recruitment mini-project challenge, it is illustrative only as time-limited. Only limited validation of input data is performed ( the 'direction' instructions are validated). Also only a few sample unit tests are included for illustrative purposes. Full input data validation and testing would have been performed in a real-world context.

To run the illustrative unit tests first install the project dependencies ( 'npm install' ) from a NodeJS installation. Then run command 'npm test'.

For full details of the Minefield Challenge, please see included 'Turtle Challenge Instructions' document
