// Ai2CanvasAnimation.js Version 1.2
// Animation support for the Ai->Canvas Export Plug-In
// By Mike Swanson (http://blog.mikeswanson.com/)

// Create a shared standard clock
var timeProvider = new standardClock();

// All animation clocks
var clocks = new Array();

// Represents an animation clock
function clock(duration, delay, direction, reverses, iterations, timingFunction, range, multiplier, offset) {

  // Initialize
  this.timeProvider = timeProvider;                 // Time provider
  this.duration = duration;                         // Duration (in seconds)
  this.delay = delay;                               // Initial delay (in seconds)
  this.direction = direction;                       // Direction (-1 = backward, 1 = forward)
  this.reverses = reverses;                         // Does this reverse? (true/false)
  this.iterations = iterations;                     // Number of iterations (0 = infinite)
  this.timingFunction = timingFunction;             // Timing function
  this.multiplier = (range * multiplier);           // Value multiplier (after timing function)
  this.offset = (range * offset);                   // Value offset (after multiplier)

  // Reset the clock
  this.reset = function () {

    this.startTime = 0;                             // Start time reference
    this.stopTime = 0;                              // Stop time reference
    this.lastTime = 0;                              // Last time reference
    this.baseDirection = this.direction;            // Base direction
    this.d = this.baseDirection;                    // Current direction
    this.t = (this.baseDirection == 1 ? 0.0 : 1.0); // Current clock time (0.0 - 1.0)
    this.i = 0;                                     // Current iteration
    this.isRunning = false;                         // Is this running?
    this.isFinished = false;                        // Is the entire clock run finished?
    this.value = 0.0;                               // Current computed clock value
  }

  // Reset to initial conditions
  this.reset();

  // Add events
  this.started = new customEvent("started");
  this.stopped = new customEvent("stopped");
  this.iterated = new customEvent("iterated");
  this.finished = new customEvent("finished");

  // Start the clock
  this.start = function () {

    // Only start if the clock isn't running and it hasn't finished
    if (!this.isRunning && !this.isFinished) {

      // Capture start time
      this.startTime = this.timeProvider.ticks() - (this.stopTime - this.startTime);

      // Start the animation
      this.isRunning = true;

      // Started event
      this.started.fire(null, { message: this.started.eventName });
    }
  }

  // Re-start the clock (reset and start)
  this.restart = function () {

    this.reset();
    this.start();
  }

  // Stop the clock
  this.stop = function () {

    // Only stop if the clock is running and it hasn't finished
    if (this.isRunning && !this.isFinished) {

      // Capture stop time
      this.stopTime = this.timeProvider.ticks();

      // Stop the animation
      this.isRunning = false;

      // Stopped event
      this.stopped.fire(null, { message: this.stopped.eventName });
    }
  }

  // Toggle the clock
  this.toggle = function () {

    // Only toggle the clock if it hasn't finished
    if (!this.isFinished) {

      // Is the clock running?
      if (this.isRunning) {

        // Stop the clock
        this.stop();
      }
      else {

        // Start the clock
        this.start();
      }
    }
  }

  // Rewind the clock
  this.rewind = function () {

    // Only rewind if the clock is running and it hasn't finished
    if (this.isRunning && !this.isFinished) {

      // Rewind to the beginning of the current iteration
      this.jumpTo(this.i);
    }
  }

  // Fast-forward the clock
  this.fastForward = function () {

    // Only fast-forward if the clock is running and it hasn't finished
    if (this.isRunning && !this.isFinished) {

      // Fast-forward to the beginning of the next iteration
      this.jumpTo(this.i + 1);
    }
  }

  // Reverse the clock
  this.reverse = function () {

    // Only reverse if the clock is running and it hasn't finished
    if (this.isRunning && !this.isFinished) {

      // Reverse the clock direction
      this.baseDirection = -this.baseDirection;

      // Jump to the same position, but in reverse
      var position = this.i + (this.d == -1.0 ? this.t : (1.0 - this.t));
      this.jumpTo(position);
    }
  }

  // Jump to iteration
  this.jumpTo = function(iteration) {

    // Determine iteration time
    var now = this.timeProvider.ticks();
    var ticksPerSecond = this.timeProvider.ticksPerSecond();
    var iterationTime = (this.delay * ticksPerSecond) + 
                        ((iteration * this.duration) * ticksPerSecond);
    this.startTime = (now - iterationTime);
  }

  // Update function
  this.update = updateClock;

  // Set initial value
  this.value = (this.timingFunction(this.t) * this.multiplier) + this.offset;

  // Add to clocks array
  clocks.push(this);
}

// Update clock state
function updateClock() {

  // Is clock running?
  if (this.isRunning && !this.isFinished) {

    // Capture the current time
    var now = this.timeProvider.ticks();

    // Has the time changed?
    if (now != this.lastTime) {

      // How many seconds have elapsed since the clock started?
      var elapsed = (now - this.startTime) / this.timeProvider.ticksPerSecond();

      // How many possible iterations?
      var iterations = (elapsed - this.delay) / this.duration;

      // Need to wait more?
      if (iterations < 0.0) {

        // Reset to 0
        iterations = 0.0;
      }

      // Capture current iteration
      var currentIteration = Math.floor(iterations);

      // Iteration changed?
      if (currentIteration != this.i) {

        // Iterated event
        this.iterated.fire(null, { message: this.iterated.eventName });
      }

      // How far "into" the iteration?
      this.t = iterations - currentIteration;

      // Is this finite?
      if (this.iterations != 0) {

        // Reached the limit?
        if (currentIteration >= this.iterations) {

          // Set to end of final iteration
          currentIteration = this.iterations - 1;
          this.t = 1.0;

          // Stop clock
          this.stop();

          // This clock has finished
          this.isFinished = true;

          // Finished event
          this.finished.fire(null, { message: this.finished.eventName });
        }
      }

      // Track current iteration
      this.i = currentIteration;

      // Does direction ever change?
      if (this.reverses) {

        // Is this an even iteration? (0 is considered even)
        if ((Math.floor(this.i) % 2) == 0) {

          // Original direction
          this.d = this.baseDirection;
        }
        else {

          // Alternate direction
          this.d = -this.baseDirection;
        }
      }
      else {

        // Direction doesn't change
        this.d = this.baseDirection;
      }

      // Moving "backwards"?
      if (this.d == -1) {

        // Adjust "t"
        this.t = (1.0 - this.t);
      }

      // Update current computed clock value
      this.value = (this.timingFunction(this.t) * this.multiplier) + this.offset;

      // Remember last time
      this.lastTime = now;
    }
  }
}

// Update all animation clocks
function updateAllClocks() {

  // Loop through clocks
  var clockCount = clocks.length;
  for (var i = 0; i < clockCount; i++) {

    // Update clock
    clocks[i].update();
  }
}

// Standard clock
function standardClock() {

  // Return current tick count
  this.ticks = function() {

    return new Date().getTime();
  }

  // Return number of ticks per second
  this.ticksPerSecond = function() {

    return 1000;
  }
}

// Custom event
function customEvent() {

  // Name of the event
  this.eventName = arguments[0];

  // Subscribers to notify on event fire
  this.subscribers = new Array();

  // Subscribe a function to the event
  this.subscribe = function(fn) {

    // Only add if the function doesn't already exist
    if (this.subscribers.indexOf(fn) == -1) {

      // Add the function
      this.subscribers.push(fn);
    }
  };

  // Fire the event
  this.fire = function(sender, eventArgs) {

    // Any subscribers?
    if (this.subscribers.length > 0) {

      // Loop through all subscribers
      for (var i = 0; i < this.subscribers.length; i++) {

        // Notify subscriber
        this.subscribers[i](sender, eventArgs);
      }
    }
  };
};

// Updates animation path
function updatePath() {

  // Reference the animation path clock
  var clock = this.pathClock;

  // Where is T in the linear animation?
  var t = clock.value;

  // Has the clock value changed?
  if (t != this.lastValue) {

    // Limit t
    if (t < 0.0 || t > (this.linear.length - 1)) {

      t = (t < 0.0) ? 0.0 : (this.linear.length - 1);
    }
    var tIndex = Math.floor(t);

    // Distance between index points
    var d = (t - tIndex);

    // Get segment indices
    var segment1Index = this.linear[tIndex][0];
    var segment2Index = segment1Index;

    // U values to interpolate between
    var u1 = this.linear[tIndex][1];
    var u2 = u1;

    // Get T values
    var t1 = this.linear[tIndex][2];
    var t2 = t1;

    // If in bounds, grab second segment
    if ((tIndex + 1) < (this.linear.length))
    {
      var segment2Index = this.linear[(tIndex + 1)][0];
      var u2 = this.linear[(tIndex + 1)][1];
      var t2 = this.linear[(tIndex + 1)][2];
    }

    // Segment index and U value
    var segmentIndex = segment1Index;
    var u = 0.0;

    // Interpolate

    // Same segment?
    if (segment1Index == segment2Index)
    {
      // Interpolate U value
      u = (d * (u2 - u1)) + u1;
    }
    else
    {

      // Difference in T
      var deltaT = t2 - t1;

      // Based on distance, how "far" are we along T?
      var tDistance = d * deltaT;

      // How much segment 1 T?
      var segment1T = (this.segmentT[segment1Index] - t1);

      // Part of the first segment (before the anchor point)?
      if ((t1 + tDistance) < this.segmentT[segment1Index])
      {

        // How far along?
        var p = (segment1T == 0 ? 0 : tDistance / segment1T);

        // Compute U
        u = ((1.0 - u1) * p) + u1;
      }
      else
      {
        // Beginning of second segment
        segmentIndex = segment2Index;

        // How much segment 2 T?
        var segment2T = (t2 - this.segmentT[segment1Index]);

        // How much T remains in this segment?
        var tRemaining = tDistance - segment1T;

        // How far along?
        var p = (segment2T == 0 ? 0 : tRemaining / segment2T);

        // Compute U
        u = p * u2;
      }
    }

    // Calculate bezier curve position
    this.x = bezier(u,
                    this.points[segmentIndex][0][0],
                    this.points[segmentIndex][1][0],
                    this.points[segmentIndex][2][0],
                    this.points[segmentIndex][3][0]);

    this.y = bezier(u,
                    this.points[segmentIndex][0][1],
                    this.points[segmentIndex][1][1],
                    this.points[segmentIndex][2][1],
                    this.points[segmentIndex][3][1]);

    // Determine follow orientation
    var qx = 0.0;
    var qy = 0.0;

    // At a 0.0 or 1.0 boundary?
    if (u == 0.0) {

      // Use control point
      qx = this.points[segmentIndex][1][0];
      qy = this.points[segmentIndex][1][1];

      this.orientation = followOrientation(this.x, this.y, qx, qy, clock.d);
    }
    else if (u == 1.0) {

      // Use control point
      qx = this.points[segmentIndex][1][0];
      qy = this.points[segmentIndex][1][1];

      this.orientation = followOrientation(qx, qy, this.x, this.y, clock.d);
    }
    else {

      // Calculate quadratic curve position
      qx = quadratic(u,
                     this.points[segmentIndex][0][0],
                     this.points[segmentIndex][1][0],
                     this.points[segmentIndex][2][0]);

      qy = quadratic(u,
                     this.points[segmentIndex][0][1],
                     this.points[segmentIndex][1][1],
                     this.points[segmentIndex][2][1]);

      this.orientation = followOrientation(qx, qy, this.x, this.y, clock.d);
    }

    // Remember this clock value
    this.lastValue = t;
  }

  // Update clock
  clock.update();
}

// Returns follow orientation
function followOrientation(x1, y1, x2, y2, direction) {

  // Forward?
  if (direction == 1) {

    return slope(x1, y1, x2, y2);
  }
  else {

    return slope(x2, y2, x1, y1);
  }
}

// Returns a position along a cubic Bezier curve
function bezier(u, p0, p1, p2, p3) {

  return Math.pow(u, 3) * (p3 + 3 * (p1 - p2) - p0)
         + 3 * Math.pow(u, 2) * (p0 - 2 * p1 + p2)
         + 3 * u * (p1 - p0) + p0;
}

// Returns a position along a quadratic curve
function quadratic(u, p0, p1, p2) {

  u = Math.max(Math.min(1.0, u), 0.0);

  return Math.pow((1.0 - u), 2) * p0 +
         2 * u * (1.0 - u) * p1 +
         u * u * p2;
}

// Returns the slope between two points
function slope(x1, y1, x2, y2) {

  var dx = (x2 - x1);
  var dy = (y2 - y1);

  return Math.atan2(dy, dx);
}

// Penner timing functions
// Based on Robert Penner's easing equations: http://www.robertpenner.com/easing/
function linear(t) {
  return t;
}

function sineEaseIn(t) {
  return -Math.cos(t * (Math.PI/2)) + 1;
}

function sineEaseOut(t) {
  return Math.sin(t * (Math.PI/2));
}

function sineEaseInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

function quintEaseIn(t) {
  return t * t * t * t * t;
}

function quintEaseOut(t) {
  t--;
  return t * t * t * t * t + 1;
}

function quintEaseInOut(t) {
  t /= 0.5;
  if (t < 1) { return 0.5 * t * t * t * t * t; }
  t -= 2;
  return 0.5 * (t * t * t * t * t + 2);
}

function quartEaseIn(t) {
  return t * t * t * t;
}

function quartEaseOut(t) {
  t--;
  return -(t * t * t * t - 1);
}

function quartEaseInOut(t) {
  t /= 0.5;
  if (t < 1) { return 0.5 * t * t * t * t; }
  t -= 2;
  return -0.5 * (t * t * t * t - 2);
}

function circEaseIn(t) {
  return -(Math.sqrt(1 - (t * t)) - 1);
}

function circEaseOut(t) {
  t--;
  return Math.sqrt(1 - (t * t));
}

function circEaseInOut(t) {
  t /= 0.5;
  if (t < 1) { return -0.5 * (Math.sqrt(1 - t * t) - 1); }
  t-= 2;
  return 0.5 * (Math.sqrt(1 - t * t) + 1);
}

function quadEaseIn(t) {
  return t * t;
}

function quadEaseOut(t) {
  return -1.0 * t * (t - 2.0);
}

function quadEaseInOut(t) {
  t /= 0.5;
  if (t < 1.0) {
    return 0.5 * t * t;
  }
  t--;
  return -0.5 * (t * (t - 2.0) - 1);
}

function cubicEaseIn(t) {
  return t * t * t;
}

function cubicEaseOut(t) {
  t--;
  return t * t * t + 1;
}

function cubicEaseInOut(t) {
  t /= 0.5;
  if (t < 1) { return 0.5 * t * t * t; }
  t -= 2;
  return 0.5 * (t * t * t + 2);
}

function bounceEaseOut(t) {
  if (t < (1.0 / 2.75)) {
    return (7.5625 * t * t);
  } else if (t < (2 / 2.75)) {
    t -= (1.5 / 2.75);
    return (7.5625 * t * t + 0.75);
  } else if (t < (2.5 / 2.75)) {
    t -= (2.25 / 2.75);
    return (7.5625 * t * t + 0.9375);
  } else {
    t -= (2.625 / 2.75);
    return (7.5625 * t * t + 0.984375);
  }
}

function bounceEaseIn(t) {
  return 1.0 - bounceEaseOut(1.0 - t);
}

function bounceEaseInOut(t) {
  if (t < 0.5) {
    return bounceEaseIn(t * 2.0) * 0.5;
  } else {
    return bounceEaseOut(t * 2.0 - 1.0) * 0.5 + 0.5;
  }
}

function expoEaseIn(t) {
  return (t == 0.0) ? 0.0 : Math.pow(2.0, 10.0 * (t - 1));
}

function expoEaseOut(t) {
  return (t == 1.0) ? 1.0 : -Math.pow(2.0, -10.0 * t) + 1.0;
}

function expoEaseInOut(t) {
  if (t == 0) {
    return 0.0;
  } else if (t == 1.0) {
    return 1.0;
  } else if ((t / 0.5) < 1.0) {
    t /= 0.5;
    return 0.5 * Math.pow(2.0, 10.0 * (t - 1));
  } else {
    t /= 0.5;
    return 0.5 * (-Math.pow(2.0, -10.0 * (t - 1)) + 2);
  }
}

// Other timing functions

function zeroStep(t) {
  return (t <= 0.0 ? 0.0 : 1.0);

}

function halfStep(t) {
  return (t < 0.5 ? 0.0 : 1.0);

}

function oneStep(t) {
  return (t >= 1.0 ? 1.0 : 0.0);
}

function random(t) {
  return Math.random();
}

function randomLimit(t) {
  return Math.random() * t;
}

function clockTick(t) {
  var steps = 60.0;
  return Math.floor(t * steps) / steps;
}