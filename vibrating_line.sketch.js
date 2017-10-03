const WIDTH = 300;
const HEIGHT = 600; // IMPORTANT: use even number!
const NUM_PARABOLAS = 15;

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
   cursor = new Cursor(WIDTH / 2, WIDTH / 2);

      // Schritt 1: ersten Durchlauf richtig setzen: getan
   var heightSetter;
   var evenNum = (NUM_PARABOLAS % 2) == 0;
   if(evenNum)
      heightSetter = 5;
   else
      heightSetter = 0;

   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      parabolas.push(new Parabola(0.75, 0.1, (HEIGHT / 2) + heightSetter, 200, 200));

      // in the case of an even NUM_PARABOLAS, I want on both sode of HEIGHT / 2 the same number of lines
      heightSetter *= -1;
      if(evenNum)
      {
         if((i + 1) % 2 == 0)
            heightSetter += 10;
      }
      else // if uneven NUM_PARABOLAS, one line in the middle
      {
         if((i + 1) % 2 != 0)
            heightSetter += 10;
      }
   }

   // von der Mitte ausgehen:
   /*
      wenn ungerade, sodass genau eine in der Mitte, dann Folge:
      (HEIGHT / 2) + 0, 10, -10,  20, -20,  30, -30...
      i =            0   1   2    3    4
      (HEIGHT / 2) + 5, -5,  15, -15,  25, -25...


      wenn gerade, dann keines in der Mitte, sonder 5 px nach oben und unten
      (HEIGHT / 2) + 5, -5, 10, -10, 15, -15...



   */
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

   // drawing red middle line to test
   stroke(255, 0, 0);
   line(0, HEIGHT / 2, WIDTH, HEIGHT/ 2);
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
