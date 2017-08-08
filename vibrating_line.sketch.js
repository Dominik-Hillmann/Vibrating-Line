const WIDTH = 300;
const HEIGHT = 300;
var parabola = new Parabola(0.75, 0.1, (WIDTH / 2));// SPÄTER PARAMETER FÜR POSITION
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
   var cursor = new Cursor(mouseY, null);
}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);

   // Lösung zum Wechsel der Anvisierung Bildmitte vs Cursor: nicht die aktuelle Pos verändern, sondern das Ziel, das anfangs die Kraft berechnet
   parabola.computeForce();
   parabola.draw();

   fill(255, 255, 255);
   text("" + frameCount, 10, 10);
   /*if(frameCount == 150)
      parabola.held = false;*/
   cursor.last = cursor.now;
   cursor.now = mouseY;
   if(frameCount < 151 && (frameCount % 2) === 0)
      console.log("Now: " + cursor.now + ", Past: " + cursor.last + ", frame: " + frameCount);

   // späteres Testen, ob cursor über Linie geht
      // Objekt, das Pos aus letzter Loop speichert
      // wenn letzt kleiner oder größer und wenn jetziger



   /*// red line to see where the middle is
   stroke(255, 0, 0);
   line(0, HEIGHT / 2, WIDTH, HEIGHT / 2);*/
}


/*
      TODO:
      Formel für Parabel finden XXX
      Formel implementieren XXX

      Wie die parabel dazu bringen, ihre Nulllinie anzuvisieren, und nicht
      dort hin zu springen

*/
