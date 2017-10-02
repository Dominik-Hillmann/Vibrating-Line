const WIDTH = 300;
const HEIGHT = 600;
const NUM_PARABOLAS = 25;

var parabola;
var parabola2;
var parabolas = [];
var cursor;
var c;
// random Zahl, aber der Parabel zurückspringt
// nach Anzahl gleichmäßig verteilen an HEIGHT oder WIDTH

function setup()
{
   createCanvas(WIDTH, HEIGHT);

   var heightSetter = HEIGHT / 2;
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      parabolas.push(new Parabola(0.75, 0.1, heightSetter, 250, 250));
      heightSetter += 10;
   }

   cursor = new Cursor(WIDTH / 2, WIDTH / 2);
   // parabola = new Parabola(0.75, 0.1, (HEIGHT / 2), 250, 250);// SPÄTER PARAMETER FÜR POSITION
   // parabola2 = new Parabola(0.75, 0.1, ((HEIGHT / 2) - 50), 250, 250);
}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);

   cursor.update();

   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      parabolas[i].checkCursor(cursor);
      parabolas[i].computeForce(cursor);
      parabolas[i].draw();
   }
/*
   parabola.checkCursor(cursor);
   parabola.computeForce(cursor);
   parabola.draw();

   parabola2.checkCursor(cursor);
   parabola2.computeForce(cursor);
   parabola2.draw();

   fill(255, 255, 255);
   text(frameCount, 10, 10);
   */
   // späteres Testen, ob cursor über Linie geht
      // Objekt, das Pos aus letzter Loop speichert
      // wenn letzt kleiner oder größer und wenn jetziger
}
/*
TODO:
- Schieberegler für drag und strength
- Auswahlmenü für die Anzahl der Linien

*/
