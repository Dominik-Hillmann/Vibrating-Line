const WIDTH = 300;
const HEIGHT = 300; // IMPORTANT: use even number!
const NUM_PARABOLAS = 10;

var parabola;
var parabola2;
var parabolas = [];
var vertParabolas = [];
var cursor;
var c;
// random Zahl, aber der Parabel zurückspringt
// nach Anzahl gleichmäßig verteilen an HEIGHT oder WIDTH

function setup()
{
   createCanvas(WIDTH, HEIGHT);
   //cursor = new Cursor(WIDTH / 2, WIDTH / 2);
   cursor = new Cursor(HEIGHT / 2, HEIGHT / 2, WIDTH / 2, WIDTH / 2);

      // Schritt 1: ersten Durchlauf richtig setzen: getan
   var heightWidthSetter;
   var evenNum = (NUM_PARABOLAS % 2) == 0;
   if(evenNum)
      heightWidthSetter = 5;
   else
      heightWidthSetter = 0;

   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      parabolas.push(new Parabola(0.75, 0.1, (HEIGHT / 2) + heightWidthSetter, 75, 75));

      // in the case of an even NUM_PARABOLAS, I want on both sode of HEIGHT / 2 the same number of lines
      heightWidthSetter *= -1;
      if(evenNum)
      {
         if((i + 1) % 2 == 0)
            heightWidthSetter += 10;
      }
      else // if uneven NUM_PARABOLAS, one line in the middle
      {
         if((i + 1) % 2 != 0)
            heightWidthSetter += 10;
      }
   }


   // loop for vertical parabolas
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      vertParabolas.push(new VerticalParabola(0.75, 0.1, (WIDTH / 2) + heightWidthSetter, 75, 75));
      heightWidthSetter *= -1;
      if(evenNum)
      {
         if((i + 1) % 2 == 0)
            heightWidthSetter += 10;
      }
      else // if uneven NUM_PARABOLAS, one line in the middle
      {
         if((i + 1) % 2 != 0)
            heightWidthSetter += 10;
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

   // loop for vartical parabolas
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      vertParabolas[i].checkCursor(cursor);
      vertParabolas[i].computeForce(cursor);
      vertParabolas[i].draw(); // HIER PROBLEM: WIRD NICHT GEZEICHNET
   }

   // drawing red middle line to test
   stroke(255, 0, 0);
   line(0, HEIGHT / 2, WIDTH, HEIGHT/ 2);
   line(WIDTH / 2, 0, WIDTH /2, WIDTH);
}
/*
TODO:
- Schieberegler für drag und strength
- Cs für größere Fenster herausfinden und diese als Auswahl einbauen
- vertikale Linien
*/
