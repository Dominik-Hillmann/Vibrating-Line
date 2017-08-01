const WIDTH = 500;
const HEIGHT = 500;

function setup()
{
   createCanvas(HEIGHT, WIDTH);
}

function draw()
{
   background(0, 0, 0);
   stroke(255, 255, 255);



   for(var x = 0; x < WIDTH; x++)
   {
      line(x - 1, f(x - 1), x, f(x));
   }

   stroke(255, 0, 0);
   line(0, HEIGHT / 2, WIDTH, HEIGHT / 2);
}


/*
      TODO:
      postiv: Parabel muss nach oben verschoben werden
      negativ: Parabel muss nach unten verschoben werden

      Mechanismus, damit bei unterschiedlicher Stauchung, die Nullstellen gleich bleiben:
      Parameter für Stauchung Höhe müssen immer das gleiche Verhältnis haben
*/
