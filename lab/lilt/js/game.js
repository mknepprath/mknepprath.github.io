var position = "start";
var response = "";

$( "#tweet" ).click(function() {

  var tweet = $('#move').val();
  var move = $('#move').val().toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  if (position === "start") {

    if (move === "start") {
      position = "cell";
      response = "You wake up in an unfamiliar room.";
    }
    else {
      response = "You can't do that."
    }

  }

  else if (position === "cell") {

    if (move === "look at room") {
      response = "Typical room, four walls, one is made of bars."
    }
    else if (move === "look at walls") {
      response = "There’s a front wall with bars, back, left, and right wall. That front wall looks pretty interesting."
    }
    else if (move === "look at front wall") {
      response = "There’s a door, and through the bars you see a trail of large ants and a key on the floor out of reach."
    }
    else if (move === "look at right wall") {
      response = "There’s a window with a floor on the sill."
    }
    else if (move === "look at window" || move === "look through window" || move === "look out window") {
      response = "There's a dense forest. You can see a blue bird tweeting."
    }
    else if (move === "open door" || move === "open the door") {
      response = "Surprise, no can do."
    }
    else if (move === "pick up ants" || move === "pick up ant" || "pick up an ant") {
      response = "They bite you. You drop it."
    }
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

  $( ".command" ).prepend( "<li class='list-group-item' data-position='" + position + "'>@mknepprath " + tweet + "</li>" );
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-info'>@familiarlilt " + response + "</li>" );
  $('#move').val('');

});

$( "#reset" ).click(function() {
  location.reload();
});
