// init cookie on first visit
if (!(Cookies.get('position'))) {
  Cookies.set('position', 'start');
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>&quot;Start&quot; to play.</li>" );
}
else {
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>Continue your game or &quot;Reset&quot;. Current position: " + Cookies.get('position') + "</li>" );
};
var response = "";

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
    if (move === "look at back wall") {
      response = "Your comfy bed is there, with pillow and blanket. A bowl of old(ish) apple paste sits next to it."
    }
    else if (move === "look at blue bird" || move === "look at bird" || move === "look at the bird") {
      response = "It’s song gives you hope."
    }
    else if (move === "look at left wall") {
      response = "You see a chest and bucket."
    }
    else if (move === "look at front wall") {
      response = "There’s a door, and through the bars you see a trail of large ants and a key on the floor out of reach."
    }
    else if (move === "look at right wall") {
      response = "There’s a window with a floor on the sill."
    }
    else if (move === "look at room" || move === "look around") {
      response = "Typical room, four walls, one is made of bars."
    }
    else if (move === "look at walls") {
      response = "There’s a front wall with bars, back, left, and right wall. That front wall looks pretty interesting."
    }
    else if (move === "look at window" || move === "look through window" || move === "look out window") {
      response = "There's a dense forest. You can see a <a href='http://twitter.com/lilt_bird' target='_blank'>@lilt_bird</a> tweeting."
    }
    // open options
    else if (move === "open door" || move === "open the door") {
      response = "Surprise, no can do."
    }
    // pick up options
    else if (move === "pick up ants" || move === "pick up ant" || move === "pick up an ant") {
      response = "They bite you. You drop it."
    }
    // go through options
    else if (move === "go through window") {
      response = "You are much larger than the window."
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
