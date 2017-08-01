// function for parabola
function f(x, correction)
{
   var a = -50; // diese Variable ändern, um Schwingung zu verursachen
   var b = -WIDTH / 2;
   var c = 22500; // no idea why until now, but it works
   console.log(1/22500);
   return (a/c) * Math.pow(x + b, 2) - a;

   // Stauchung * Vertikalverschiebung^2 + Horizintalverschiebung
}
