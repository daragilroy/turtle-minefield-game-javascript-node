const chai = require('chai');
const should = chai.should();
const Turtle = require('../../turtle.class.js');

const turtle = new Turtle();

describe('Turtle Class', function(){
	context('move method', function(){
		
		it('should move one position northwards - y coordinate reduced by 1', function(){			

			const position = [2,2];
			const direction = 'north';

			turtle.move(position, direction)
				.should.eql([2,1]);
		});

		it('should move one position eastwards - y coordinate increased by 1', function(){
			
			const position = [2,2];
			const direction = 'east';

			turtle.move(position, direction)
				.should.eql([3,2]);
		});

		it('should move one position southwards - y coordinate increased by 1', function(){

			const position = [2,2];
			const direction = 'south';

			turtle.move(position, direction)
				.should.eql([2,3]);
		});

		it('should move one position westwards - x coordinate reduced by 1', function(){

			const position = [2,2];
			const direction = 'west';

			turtle.move(position, direction)
				.should.eql([1,2]);
		});

	});

	context('rotate method', function(){
		
		it('should change direction from north to east', function(){			

			const direction = 'north';

			turtle.rotate(direction)
				.should.equal('east');
		});

		it('should change direction from east to south', function(){
			
			const direction = 'east';

			turtle.rotate(direction)
				.should.equal('south');
		});

		it('should change direction from south to west', function(){

			const direction = 'south';

			turtle.rotate(direction)
				.should.equal('west');
		});

		it('should change direction from west to north', function(){

			const direction = 'west';

			turtle.rotate(direction)
				.should.equal('north');
		});

	});



});