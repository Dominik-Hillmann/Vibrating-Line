const WIDTH = 300;
const HEIGHT = 300;
var parabola;
var cursor;
// random Zahl, aber der Parabel zurückspringt
// nach Anzahl gleichmäßig verteilen an HEIGHT oder WIDTH

/*
var drag = 0.75; // what gets taken away every frame from the velocity
var strength = 0.1; // wie viel Einwirkung die durch Abstand entstandende Kraft hat
var velocity = 0;
var position = 0;
var force = 0;*/

function setup()
{
   createCanvas(HEIGHT, WIDTH);
   cursor = new Cursor(WIDTH / 2, WIDTH / 2);
   parabola = new Parabola(0.75, 0.1, (WIDTH / 2), 0, 500);// SPÄTER PARAMETER FÜR POSITION
}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);

   // Lösung zum Wechsel der Anvisierung Bildmitte vs Cursor: nicht die aktuelle Pos verändern, sondern das Ziel, das anfangs die Kraft berechnet
   //cursor.last = cursor.now;
   //cursor.now = mouseY; // das noch in eine Update-Methode
   cursor.update();

   parabola.checkCursor(cursor);

   // parabola.checkCursor(cursor);
   parabola.computeForce(cursor);
   parabola.draw();

   fill(255, 255, 255);
   text(frameCount, 10, 10);
   // point(100, 100);




   //if(frameCount < 151 && (frameCount % 2) === 0)
      //console.log(", Past: " + cursor.last + " Now: " + cursor.now + ", frame: " + frameCount + " line: " + parabola.restingLineY);

   // späteres Testen, ob cursor über Linie geht
      // Objekt, das Pos aus letzter Loop speichert
      // wenn letzt kleiner oder größer und wenn jetziger



   /*// red line to see where the middle is
   stroke(255, 0, 0);
   line(0, HEIGHT / 2, WIDTH, HEIGHT / 2);*/
}
