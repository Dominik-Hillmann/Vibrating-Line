const WIDTH = 300;
const HEIGHT = 300;

var drag = 0.75; // what gets taken away every frame from the velocity
var strength = 0.1; // wie viel Einwirkung die durch Abstand entstandende Kraft hat
var velocity = 0;
var position = 0;
var force = 0;

function setup()
{
   var canvas = createCanvas(HEIGHT, WIDTH);
   canvas.mouseClicked(parabola.letLoose);


}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);

   // wenn losgelassen: nicht Abstand Ball - Cursor, wie im Video, sondern zur Nulllinie
   force = (HEIGHT/2) - position; // Kraft, die durch neuen Abstand entsteht
   force *= strength; // Die Härte der Feder nimmer der Kraft anteilig Stärke; schwache Feder -> wenig Kraft über, starkt -> viel

   velocity *= drag; // je weiter in Zeit, desto mehr wird von der Stärke der Bewegung genommen
   velocity += force;
   position += velocity;

   // connects two points at a time over the course of the parabola
   if(parabola.held)
   {
      for(var x = 0; x < WIDTH; x++)
      {
         line
         (
            // x position and y position at beginning of the conncetion line
            x - 1,
            f(x - 1, -mouseY + (HEIGHT / 2)),
            // x and y position at end of conncetion line
            x,
            f(x, -mouseY + (HEIGHT / 2))
         );
      }
   }
   else
   {
      for(var x = 0; x < WIDTH; x++)
      {
         line
         (
            // x position and y position at beginning of the conncetion line
            x - 1,
            f(x - 1, -position + (HEIGHT / 2)),
            // x and y position at end of conncetion line
            x,
            f(x, -position + (HEIGHT / 2))
         );
      }
   }



   // red line to see where the middle is
   stroke(255, 0, 0);
   line(0, HEIGHT / 2, WIDTH, HEIGHT / 2);
}


/*
      TODO:
      Formel für Parabel finden XXX
      Formel implementieren XXX

      wie Schwingung erzeugen
         Klickevent
         a kleiner werden lassen
         wie "überziehen"

*/
