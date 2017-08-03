// function for parabola
function f(x, a)
{
   // a being the y position of the cursor
   var c = 22500; // the correct c depends on how big the frame is, it makes the parabola so that it has the zero points at the right coordinates
   return (a/c) * Math.pow(x - WIDTH / 2, 2) - (a - HEIGHT / 2);

   // Stauchung * Vertikalverschiebung^2 + Horizintalverschiebung
}

var parabola =
{
   held: true,
   letLoose: function()
   {
      parabola.held = false;
   }   
}
