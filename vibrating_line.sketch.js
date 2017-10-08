const WIDTH = 300;
const HEIGHT = 300; // IMPORTANT: use even number!
const NUM_PARABOLAS = 10; // each, vertically, and horizontally

var horiParabolas = [];
var vertParabolas = [];
var cursor;

var dragSelect;
var strengthSelect;
var drag;
var strength;

function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   canvas.parent("sketch-holder");

   cursor = new Cursor(HEIGHT / 2, HEIGHT / 2, WIDTH / 2, WIDTH / 2);
   // variables to reference the two selects
   dragSelect = document.getElementById("drag");
   strengthSelect = document.getElementById("strength");
   // variables that contain actual current chosen value from the select elements
   drag = dragSelect.options[dragSelect.selectedIndex].value;
   strength = strengthSelect.options[strengthSelect.selectedIndex].value;

   // helps to set the lines at the correct position
   var heightWidthSetter = evenNum();
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      horiParabolas.push(new HorizontalParabola(drag, strength, (HEIGHT / 2) + heightWidthSetter, 100, 100));
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
      vertParabolas.push(new VerticalParabola(drag, strength, (WIDTH / 2) + heightWidthSetter, 100, 100));
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
   cursor.update();
   // get current values chosen at the select elements
   drag = dragSelect.options[dragSelect.selectedIndex].value;
   strength = strengthSelect.options[strengthSelect.selectedIndex].value;
   // and the new values are assigned to each parabola
   for(var i = 0; i < NUM_PARABOLAS; i++)
   {
      horiParabolas[i].drag = drag;
      vertParabolas[i].drag = drag;
      horiParabolas[i].strength = strength;
      vertParabolas[i].strength = strength;
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
