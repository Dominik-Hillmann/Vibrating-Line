var Cursor = function(newPos, lastPos)
{
   this.last = lastPos;
   this.now = newPos;

   this.update = () =>
   {
      if((frameCount % 2) === 0)
      {
         this.last = this.now;
         this.now = mouseY;
      }
   }
}

// constructor for a parabola
var Parabola = function(drag, strength, restingLineY)
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

   // parabola function
   this.f = (x, highpoint) =>
   {
      var c = 22500; // the correct c depends on how big the frame is, it makes the parabola so that it has the zero points at the right coordinates
      return (highpoint / c) * Math.pow(x - (WIDTH / 2), 2) - (highpoint - (HEIGHT / 2));

      // Stauchung * Vertikalverschiebung^2 + Horizintalverschiebung
   }

   // changes values so that if drawn with the values via f(x) it looks natural
   this.computeForce = () => // arrow because this function would create new reference to "this"
   {
      if(this.held)
         this.force = mouseY - this.position; // line wants to go to y position of the cursor
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
      //if(this.held)
      //{
         for(var x = 0; x < WIDTH; x++)
         {
            line
            (
               // x position, f(x position, compression of parabola determined by cursor's position)
               x - 1, this.f(x - 1, -this.position + this.restingLineY),
               x, this.f(x, -this.position + this.restingLineY)
            );
         }
      //}
      //else
      //{
      //   for(var x = 0; x < WIDTH; x++)
      //   {
      //      line
      //      (
               // x position, f(x position, compression of parabola determined by cursor's position)
      //         x - 1, this.f(x - 1, -this.position/* + this.restingLineY*/),
      //         x, this.f(x, -this.position/* + this.restingLineY*/)
      //      );
      //   }
      //}
   }

   // checks whether cursor came across resting line via checking the cursor object
   // and if it crosses the line, it will be attached to the cursor by changing this.held to true
   /*this.checkCursor = (cursorObj) =>
   {
      if((cursorObj.last <= this.restingLineY) && (cursorObj.now >= this.restingLineY))
         this.held = true;
   }*/

   this.checkCursor = (cursor) =>
   {
      //console.log(cursor.last > this.restingLineY, cursor.now <= this.restingLineY);
      if(!this.held) // catching the line if not already held
      {
         if((cursor.last > this.restingLineY) && (cursor.now < this.restingLineY)) // cursor coming from below
            this.held = true;
         else if((cursor.last < this.restingLineY) && (cursor.now > this.restingLineY))
         {
            this.held = true;
            console.log((cursor.last < this.restingLineY), (cursor.now > this.restingLineY));
         }
      }
   }
}
