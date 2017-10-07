// cursor constructor whose instance knows the current pos and the pos of one frame ago
var Cursor = function(newPosY, newPosX, lastPosY, lastPosX)
{
   // x and y position in the last frame
   this.last =
   {
      x : lastPosX,
      y : lastPosY,
   };
   // x and y position in the curremt frame
   this.now =
   {
      x : newPosX,
      y : newPosY,
   };
   // Update: last position is current position and current position is current poisition of cursor
   this.update = () =>
   {
      this.last.x = this.now.x;
      this.last.y = this.now.y;
      this.now.x = mouseX;
      this.now.y = mouseY;
   }
}

// constructor for a horizontal parabola
var HorizontalParabola = function(drag, strength, restingLineY, toleranceAbove, toleranceBelow)
{
   this.held = false;
   // vars for calculation of movement
   this.drag = drag;
   this.strength = strength;
   this.velocity = 0;
   this.force = 0;
   this.position = 0;
   // y position of straight line when resting
   this.restingLineY = restingLineY;
   this.toleranceAbove = toleranceAbove;
   this.toleranceBelow = toleranceBelow;

   // parabola function
   this.f = (x, highpoint) =>
   {
      var c = 22500; // the correct c depends on how big the frame is, it makes the parabola so that it has the zero points at the right coordinates
      //return (highpoint / c) * Math.pow(x - (HEIGHT / 2), 2) - (highpoint - (WIDTH / 2));
      return (highpoint / c) * Math.pow(x - (WIDTH / 2), 2) - (highpoint - this.restingLineY);

      // Stauchung * Vertikalverschiebung^2 + Horizintalverschiebung
   }

   // changes values so that if drawn with the values via f(x) it looks natural
   this.computeForce = (inCursor) => // arrow because this function would create new reference to "this"
   {
      if(this.held)
         this.force = inCursor.now.y - this.position; // line wants to go to y position of the cursor
      else
         this.force = this.restingLineY - this.position; // now the line wants to go to its resting position

      this.force *= this.strength;
      // ursprüngliche Kraft ist potenzielle Energie als Differenz gewollte Pos - aktuelle Pos
      // die entstandende Kraft wird je nach dem, wie stark Feder, abgeschwächt
      this.velocity *= this.drag; // derzeitige Geschwindigkeit abgeschwächt durch Reibung
      this.velocity += this.force; // zur Geschwindigkeit kommt die Kraft durch aktuelle Pos
      this.position += this.velocity; // diese Geschwindigkeit (= Ortsveränderung in geg. Zeitspanne) wird zur Pos addiert
   }

   // draws the parabola according to f(x) and  whether it is held or not
   this.draw = () =>
   {
      for(var x = 0; x < WIDTH; x++)
      {
         line
         (
            // x position, f(x position, compression of parabola determined by cursor's position)
            x - 1, this.f(x - 1, -this.position + this.restingLineY),
            x, this.f(x, -this.position + this.restingLineY)
         );
      }
   }

   this.checkCursor = (inCursor) =>
   {
      // catching the line if not already held
      if((!this.held) && (inCursor.last.y != 0)) // why "!= 0"? Because value has value 0 if it was not already moved while it was running --> avoiding glitches
      {
         // cursor was below and moves above the line
         if((inCursor.last.y > this.restingLineY) && (inCursor.now.y <= this.restingLineY))
            this.held = true;
         // cursor was above and moves below the line
         if((inCursor.last.y < this.restingLineY) && (inCursor.now.y >= this.restingLineY))
            this.held = true;
      }
      // cursor goes further above/below than tolerated
      else if(this.held && (((this.restingLineY - inCursor.now.y) > this.toleranceAbove)) ||
                            ((this.restingLineY - inCursor.now.y) < -this.toleranceBelow))
         this.held = false;
   }

   // a method that can change drag and strength
   this.changeParameters = (newDrag, newStrength) =>
   {
      this.drag = newDrag;
      this.strength = newStrength;
   }
}


// constructor for parabolas that run from top to bottom
var VerticalParabola = function(drag, strength, restingLineX, toleranceLeft, toleranceRight)
{
   this.held = false;
   // vars for calculation of movement
   this.drag = drag;
   this.strength = strength;
   this.velocity = 0;
   this.force = 0;
   this.position = 0;
   // y position of straight line when resting
   this.restingLineX = restingLineX;
   this.toleranceLeft = toleranceLeft;
   this.toleranceRight = toleranceRight;

   // parabola function
   this.f = (x, highpoint) =>
   {
      var c = 22500;
      return (highpoint / c) * Math.pow(x - (WIDTH / 2), 2) - (highpoint - this.restingLineX);
      // Stauchung * Vertikalverschiebung^2 + Horizintalverschiebung
   }

   // changes values so that if drawn with the values via f(x) it looks natural
   this.computeForce = (inCursor) => // arrow because this function would create new reference to "this"
   {
      if(this.held)
         this.force = inCursor.now.x - this.position; // line wants to go to y position of the cursor
      else
         this.force = this.restingLineX - this.position; // now the line wants to go to its resting position
      // description can be found in function HorizintalParabola
      this.force *= this.strength;
      this.velocity *= this.drag;
      this.velocity += this.force;
      this.position += this.velocity;
   }

   // draws the parabola according to f(x) and  whether it is held or not
   this.draw = () =>
   {
      for(var y = 0; y < WIDTH; y++)
      {
         line
         (
            this.f(y - 1, -this.position + this.restingLineX), y - 1,
            this.f(y, -this.position + this.restingLineX), y
         );
      }
   }

   this.checkCursor = (inCursor) =>
   {
      // catching the line if not already held
      if((!this.held) && (inCursor.last.x != 0)) // why "!= 0"? Because value has value 0 if it was not already moved while it was running --> avoiding glitches
      {
         // cursor was below and moves above the line
         if((inCursor.last.x > this.restingLineX) && (inCursor.now.x <= this.restingLineX))
            this.held = true;
         // cursor was above and moves below the line
         if((inCursor.last.x < this.restingLineX) && (inCursor.now.x >= this.restingLineX))
            this.held = true;
      }
      // cursor goes further left/right than tolerated
      else if(this.held && (((this.restingLineX - inCursor.now.x) > this.toleranceRight)) ||
                            ((this.restingLineX - inCursor.now.x) < -this.toleranceLeft))
         this.held = false;
   }
}

// constructor for an object that can remember its own past value
var MemoryValue = function(current, past, referenceInDOM)
{
   this.past = past;
   this.current = current;
   this.reference = referenceInDOM; // so there does not have to be again and again document.getElementById(...
   this.update = () =>
   {
      this.past = this.current;
      this.current = parseInt(this.reference.options[this.reference.selectedIndex].value);
      console.log(this.current, this.past); // XXX
   }
}

// returns correct coordinates to start setting parabolas
var evenNum = function()
{
   return ((NUM_PARABOLAS % 2) == 0) ? 5 : 0;
   /* 5 if even because the first two lines need to have the same distance from the middle and 10 from each other --> 5
      0 if uneven because on line has to be in the middle */
}
