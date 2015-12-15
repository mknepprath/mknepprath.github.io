// init cookie on first visit
if (!(Cookies.get('position'))) {
  Cookies.set('position', 'start');
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>&quot;Start&quot; to play.</li>" );
}
else {
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>Continue your game or &quot;Reset&quot;. Current position: " + Cookies.get('position') + "</li>" );
};
// init response
var response = "";
// init alterable cell objects
var coin_bent = false;
var key_pasted = false;
var key_acquired = false;

// when Tweet button is clicked...
$( "#tweet" ).click(function() {

  // grab tweet
  var tweet = $('#move').val();
  // sanitize tweet
  var move = tweet.toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  // start
  if (Cookies.get('position') === "start") {

    if (move === "start") {
      Cookies.set('position', 'cell');
      response = "You wake up in an unfamiliar room.";
    }
    else {
      response = "You can't do that."
    }

  }

  // cell
  else if (Cookies.get('position') === "cell") {

    // look options
    if (
      move === "look at ants" ||
      move === "look at the ants") {
      response = "They're carring food back to their colony."
    }
    else if (
      move === "look at back wall" ||
      move === "look at the back wall") {
      response = "Your comfy bed is there, with pillow and blanket. A bowl of old(ish) apple paste sits next to it."
    }
    else if (
      move === "look at blue bird" ||
      move === "look at bird" ||
      move === "look at the bird") {
      response = "It’s song gives you hope."
    }
    else if (
      move === "look at left wall" ||
      move === "look at the left wall") {
      response = "You see a chest and bucket."
    }
    else if (
      move === "look at front wall" ||
      move === "look at the front wall") {
      response = "There’s a door, and through the bars you see a trail of large ants and a key on the floor out of reach."
    }
    else if (
      move === "look at right wall" ||
      move === "look at the right wall") {
      response = "There’s a window with a floor on the sill."
    }
    else if (
      move === "look at room" ||
      move === "look at the room" ||
      move === "look around" ||
      move === "look around room" ||
      move === "look around the room" ||
      move === "look at walls" ||
      move === "look at the walls") {
      response = "There’s a front wall with bars, back, left, and right wall. That front wall looks pretty interesting."
    }
    else if (
      move === "look at window" ||
      move === "look at the window" ||
      move === "look through window" ||
      move === "look through the window" ||
      move === "look out window" ||
      move === "look out the window") {
      response = "There's a dense forest. You can see a <a href='http://twitter.com/lilt_bird' target='_blank'>@lilt_bird</a> tweeting."
    }
    // open options
    else if (
      move === "open door" ||
      move === "open the door") {
      response = "Surprise, no can do."
    }
    // pick up options
    else if (
      move === "pick up ants" ||
      move === "pick up ant" ||
      move === "pick up an ant") {
      response = "They bite you. You drop it."
    }
    else if (
      move === "pick up bucket" ||
      move === "pick up the bucket") {
      response = "The stench is overwhelming, you drop it."
    }
    else if (
      move === "pick up coin" ||
      move === "pick up the coin" ||
      move === "take coin" ||
      move === "take the coin") {
      response = "The stench is overwhelming, you drop it."
    }
    else if (
      move === "pick up key" ||
      move === "pick up the key" ||
      move === "take key" ||
      move === "take the key") {
      if (key_pasted === true) {
        key_acquired = true;
        response = "You grab the key right before it gets carried down the drain."
      }
      else {
        response = "It’s just out of reach."
      }
    }
    // go through options
    else if (
      move === "go through window" ||
      move === "go through the window") {
      response = "You are much larger than the window."
    }
    // talk to options
    else if (
      move === "talk to ants" ||
      move === "talk to the ants") {
      response = "...You are lonely."
    }
    // eat options
    else if (
      move === "eat apple paste" ||
      move === "eat the apple paste" ||
      move === "eat some apple paste") {
      response = "You eat it, but it’s so bad you spit it out. A few ants are attracted to the smell."
    }
    else if (
      move === "eat key" ||
      move === "eat the key") {
      response = "You are stuck in the cell for a day. You acquire the key about 30 hours later."
    }
    // use options for apple paste
    // use on ants
    else if (
      move === "use apple paste on ants" ||
      move === "use apple paste with ants" ||
      move === "use the apple paste on the ants" ||
      move === "use the apple paste with the ants") {
      response = "They like it. They carry it down the drain. They’re basically having an ant party."
    }
    // use on drain
    else if (
      move === "use apple paste on drain" ||
      move === "put apple paste in drain" ||
      move === "use the apple paste on the drain" ||
      move === "use the apple paste with the drain") {
      response = "Don’t be wasteful."
    }
    // use on key
    else if (
      move === "use apple paste on key" ||
      move === "put apple paste on key" ||
      move === "use apple paste with key" ||
      move === "use the apple paste on the key" ||
      move === "use the apple paste with the key" ||
      move === "throw apple paste at key" ||
      move === "throw the apple paste at the key") {
      key_pasted = true;
      response = "The paste you lobbed at the key covers it. The ants grab it and start carrying over to the drain with their food."
    }
    // use on right wall
    else if (
      move === "use apple paste on right wall" ||
      move === "use apple paste on left wall" ||
      move === "use apple paste on back wall" ||
      move === "use apple paste on wall" ||
      move === "use the apple paste on a wall" ||
      move === "use the apple paste on the walls") {
      response = "That was definitely an improvement to the wall."
    }
    // use options for coin
    // use on door
    else if (
      move === "use coin on door" ||
      move === "use coin with door" ||
      move === "use the coin on the door" ||
      move === "use the coin with the door") {
      coin_bent = true;
      response = "The coin is now bent coin."
    }
    else {
      response = "You can't do that."
    }

  }

  else {
    response = "You should not be here."
  };

  // logs tweet
  $( ".command" ).prepend( "<li class='list-group-item' data-position='" + Cookies.get('position') + "'>@mknepprath " + tweet + "</li>" );
  // logs response
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-info'>@familiarlilt " + response + "</li>" );
  // clears tweet
  $('#move').val('');

});

// reset button, deletes cookie & refreshes page
$( "#reset" ).click(function() {
  Cookies.remove('position');
  location.reload();
});
