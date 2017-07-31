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

   function f(x)
   {
      return -0.1 * Math.pow(x - (WIDTH / 2), 2) + (HEIGHT / 2);
      // Stauchung * Vertikalverschiebung^2 + Horizintalverschiebung
   }

   for(var x = 0; x < WIDTH; x++)
   {
      line(x - 1, f(x - 1), x, f(x));      
   }
}
