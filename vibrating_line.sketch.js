const WIDTH = 300;
const HEIGHT = 300; // IMPORTANT: use even number!
const NUM_PARABOLAS = 10; // each, vertically, and horizontally

var horiParabolas = [];
var vertParabolas = [];
var cursor;
var dragValue; /*= new MemoryValue(0, 0, document.getElementById("drag"));
console.log(dragValue.reference);
var strengthValue = new MemoryValue(0, 0, document.getElementById("strength"));XXX*/

function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   canvas.parent("sketch-holder");

   cursor = new Cursor(HEIGHT / 2, HEIGHT / 2, WIDTH / 2, WIDTH / 2);
   dragValue = new MemoryValue(0, 1, document.getElementById("drag"));
   strengthValue = new MemoryValue(0, 1, document.getElementById("strength"));
   //console.log(dragValue.reference.options[dragValue.reference.selectedIndex].value); XXX

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
   // canvas
   background(0, 0, 0);
   stroke(255, 255, 255);
   // update all objects' values besides parabola arrays and get current value from drag and strength
   cursor.update();
   dragValue.update();
   strengthValue.update();


   if((dragValue.past != dragValue.current) || (strengthValue.current != strengthValue.past))
   {
      console.log("Komme durch");
      for(var i = 0; i < NUM_PARABOLAS; i++)
      { //XXX
         horiParabolas[i].drag = dragValue.current;
         vertParabolas[i].drag = dragValue.current;
         horiParabolas[i].strength = strengthValue.current;
         vertParabolas[i].strength = strengthValue.current;
      }
   }

   // loop horizontal parabolas
   if(document.getElementById("horizontal").checked)
   {
      for(var i = 0; i < NUM_PARABOLAS; i++)
      {
         horiParabolas[i].checkCursor(cursor);
         horiParabolas[i].computeForce(cursor);
         horiParabolas[i].draw();
      }
   }

   // loop for vartical parabolas
   if(document.getElementById("vertical").checked)
   {
      for(var i = 0; i < NUM_PARABOLAS; i++)
      {
         vertParabolas[i].checkCursor(cursor);
         vertParabolas[i].computeForce(cursor);
         vertParabolas[i].draw();
      }
   }
}

/*
TODO:
- Schieberegler für drag und strength
   - Methode für geänderten Drag und Strength, die das entsprechend OHNE Konstruktor tut
   - .update()-Methode für neuen drag, strength, etc. XXX
- Cs für größere Fenster herausfinden und diese als Auswahl einbauen XXX
- vertikale Linien XXX
   - für an-/ausschalten ein Häkchen, dann if um die Auswertungsfunktionen in .draw XXX
   - dieses Häkchen wird direkt davor durch DOM abgerufen XXX
- index.html verschönern
   - Canvas vergrößern und in die Mitte schieben XXX
   - Schaltbuttons XXX

*/
