const WIDTH = 300;
const HEIGHT = 300; // IMPORTANT: use even number!
const NUM_PARABOLAS = 10;

var parabola;
var horiParabolas = [];
var vertParabolas = [];
var cursor;

// random Zahl, aber der Parabel zurückspringt
// nach Anzahl gleichmäßig verteilen an HEIGHT oder WIDTH

function setup()
{
   createCanvas(WIDTH, HEIGHT);
   cursor = new Cursor(HEIGHT / 2, HEIGHT / 2, WIDTH / 2, WIDTH / 2);

   var heightWidthSetter = evenNum();
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      horiParabolas.push(new HorizontalParabola(0.75, 0.1, (HEIGHT / 2) + heightWidthSetter, 75, 75));
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

   // because heightWidthSetter already used in first loop, now new starting values for second loop for vertical lines
   heightWidthSetter = evenNum();
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
}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);
   cursor.update();

   // loop horizontal parabolas
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      horiParabolas[i].checkCursor(cursor);
      horiParabolas[i].computeForce(cursor);
      horiParabolas[i].draw();
   }

   // loop for vartical parabolas
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      vertParabolas[i].checkCursor(cursor);
      vertParabolas[i].computeForce(cursor);
      vertParabolas[i].draw();
   }
}

/*
TODO:
- Schieberegler für drag und strength
   - Methode für geänderten Drag und Strength, die das entsprechend OHNE Konstruktor tut
- Cs für größere Fenster herausfinden und diese als Auswahl einbauen
- vertikale Linien XXX
   - für an-/ausschalten ein Häkchen, dann if um die Auswertungsfunktionen in .draw
   - dieses Häkchen wird direkt davor durch DOM abgerufen
- index.html verschönern
   - Canvas vergrößern und in die Mitte schieben
   - Schaltbuttons

*/
