const HEIGHT = 300;
const WIDTH = 600;
const NUM_PARABOLAS = 5;

var parabola;
var parabolas = [];
var cursor;
var c;
// random Zahl, aber der Parabel zurückspringt
// nach Anzahl gleichmäßig verteilen an HEIGHT oder WIDTH

function setup()
{
   /*for(i = 0; i < 1000000; i++)
   {
      if( )
         c = i;
   }*/
   // danach Verteilung entlang der Höhe
   createCanvas(HEIGHT, WIDTH);

   for(var y = (HEIGHT / NUM_PARABOLAS); y < HEIGHT; y += (HEIGHT / NUM_PARABOLAS))
      parabolas.push(new Parabola(0.75, 0.1, y, 200, 200));

   cursor = new Cursor(WIDTH / 2, WIDTH / 2);
   //parabola = new Parabola(0.75, 0.1, (WIDTH / 2), 100, 500);// SPÄTER PARAMETER FÜR POSITION
   for(var i = 0; i < parabolas.length; i++)
      console.log(parabolas[i]);
}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);

   cursor.update();
   for(var i = 0; i < parabolas.length; i++)
   {
      parabolas[i].checkCursor(cursor);
      parabolas[i].computeForce(cursor);
      parabolas[i].draw();
   }
   //parabola.checkCursor(cursor);

   // parabola.checkCursor(cursor);
   //parabola.computeForce(cursor);
   //parabola.draw();

   fill(255, 255, 255);
   text(frameCount, 10, 10);

   // späteres Testen, ob cursor über Linie geht
      // Objekt, das Pos aus letzter Loop speichert
      // wenn letzt kleiner oder größer und wenn jetziger
}
