// init cookie on first visit
if (!(Cookies.get('position'))) {
  var position = "start";
  Cookies.set('position', 'start');
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>&quot;Start&quot; to play.</li>" );
}
else {
  var position = Cookies.get('position');
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>Continue your game or &quot;Reset&quot;. Current position: " + Cookies.get('position') + "</li>" );
};
// init response
var response = "";
// init alterable cell objects
// coin bent
if (!(Cookies.get('chestopen'))) {
  var chest_open = false;
  Cookies.set('chestopen', false)
}
else {
  var chest_open = JSON.parse(Cookies.get('chestopen'));
  if (chest_open === true) {
    $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>The chest is open.</li>" )
  };
};
// coin acquired
if (!(Cookies.get('coinacquired'))) {
  var coin_acquired = false;
  Cookies.set('coinacquired', false)
}
else {
  var coin_acquired = JSON.parse(Cookies.get('coinacquired'));
  if (coin_acquired === true) {
    $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>You have a coin.</li>" )
  };
};
// coin bent
if (!(Cookies.get('coinbent'))) {
  var coin_bent = false;
  Cookies.set('coinbent', false)
}
else {
  var coin_bent = JSON.parse(Cookies.get('coinbent'));
  if (coin_bent === true) {
    $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>You have a bent coin.</li>" )
  };
};
// apple paste key
if (!(Cookies.get('keypasted'))) {
  var key_pasted = false;
  Cookies.set('keypasted', false)
}
else {
  var key_pasted = JSON.parse(Cookies.get('keypasted'));
  if (key_pasted === true) {
    $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>You have covered the key in apple paste.</li>" )
  };
};
// key acquired
if (!(Cookies.get('keyacquired'))) {
  var key_acquired = false;
  Cookies.set('keyacquired', false)
}
else {
  var key_acquired = JSON.parse(Cookies.get('keyacquired'));
  if (key_acquired === true) {
    $( ".command" ).prepend( "<li class='list-group-item list-group-item-warning'>You have the key.</li>" )
  };
};

// when Tweet button is clicked...
$( "#tweet" ).click(function() {

  // grab tweet
  var tweet = $('#move').val();
  // sanitize tweet
  var move = tweet.toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  // start
  if (position === "start") {

    if (
      move === "start") {
      position = "cell";
      response = "You wake up in an unfamiliar room."
    }
    else {
      response = "You can't do that."
    }

  }

  // cell
  else if (position === "cell") {

    // help options
    if (
      move === "help") {
      response = "Tweet at me to do things."
    }
    // go to
    else if (
      move.match("^go to") ||
      move.match("^move to") ||
      move.match("^run to") ||
      move === "run") {
      response = "Not a lot of space to move around in here. I better look around."
    }
    // look options
    else if (
      move === "look at ants" ||
      move === "look at the ants" ||
      move === "inspect ants" ||
      move === "inspect the ants") {
      response = "They're carrying food to a drain in the middle of the room."
    }
    else if (
      move === "look at apple paste" ||
      move === "look at the apple paste" ||
      move === "inspect apple paste" ||
      move === "inspect the apple paste" ||
      move === "look at paste" ||
      move === "look at the paste" ||
      move === "inspect paste" ||
      move === "inspect the paste") {
      response = "They're carrying food to a drain in the middle of the room."
    }
    else if (
      move === "look at back wall" ||
      move === "look at the back wall" ||
      move === "inspect back wall" ||
      move === "inspect the back wall") {
      response = "Your comfy bed is there, with pillow and blanket. A bowl of old(ish) apple paste sits next to it."
    }
    else if (
      move === "look at blue bird" ||
      move === "look at bird" ||
      move === "look at the bird" ||
      move === "inspect blue bird" ||
      move === "inspect bird" ||
      move === "inspect the bird") {
      response = "It’s song gives you hope."
    }
    else if (
      move === "look at left wall" ||
      move === "look at the left wall") {
      response = "You see a chest and bucket."
    }
    else if (
      move === "look at front wall" ||
      move === "look at the front wall" ||
      move === "look at wall" ||
      move === "look at the wall" ||
      move === "inspect front wall" ||
      move === "inspect the front wall" ||
      move === "inspect wall" ||
      move === "inspect the wall") {
      response = "The front wall has a door, and through the bars you see a trail of large ants and a key on the floor out of reach."
    }
    else if (
      move === "look at right wall" ||
      move === "look at the right wall" ||
      move === "inspect right wall" ||
      move === "inspect the right wall") {
      response = "There’s a window with a floor on the sill."
    }
    else if (
      move === "look at room" ||
      move === "look at the room" ||
      move === "look around" ||
      move === "look around room" ||
      move === "look around the room" ||
      move === "look at walls" ||
      move === "look at the walls" ||
      move === "where am I" ||
      move === "inspect room" ||
      move === "inspect the room" ||
      move === "inspect walls" ||
      move === "inspect the walls") {
      response = "There’s a front wall with bars, back, left, and right wall. That front wall looks pretty interesting."
    }
    else if (
      move === "look at window" ||
      move === "look at the window" ||
      move === "look through window" ||
      move === "look through the window" ||
      move === "look out window" ||
      move === "look out the window" ||
      move === "inspect window" ||
      move === "inspect the window") {
      response = "There's a dense forest. You can see a <a href='http://twitter.com/lilt_bird' target='_blank'>@lilt_bird</a> tweeting."
    }
    // open options
    else if (
      move === "open chest" ||
      move === "open the chest") {
      chest_open = true;
      response = "There's a coin in it."
    }
    else if (
      move === "open door" ||
      move === "open the door" ||
      move === "use key on door" ||
      move === "use key with door" ||
      move === "use the key on the door" ||
      move === "use the key with the door") {
      if (key_acquired === true) {
        response = "You open the door and step outside. To be continued..."
      }
      else {
        response = "Surprise, no can do."
      }
    }
    // pick up options
    else if (
      move === "pick up ants" ||
      move === "pick up ant" ||
      move === "pick up an ant" ||
      move === "take ants" ||
      move === "take ant" ||
      move === "take an ant" ||
      move === "grab ants" ||
      move === "grab ant" ||
      move === "grab an ant") {
      response = "They bite you. You drop it."
    }
    else if (
      move === "pick up bucket" ||
      move === "pick up the bucket" ||
      move === "take bucket" ||
      move === "take the bucket" ||
      move === "grab bucket" ||
      move === "grab the bucket") {
      response = "The stench is overwhelming, you drop it."
    }
    else if (
      move === "pick up coin" ||
      move === "pick up the coin" ||
      move === "take coin" ||
      move === "take the coin" ||
      move === "grab coin" ||
      move === "grab the coin") {
      if (chest_open === true) {
        coin_acquired = true; // only if you pick up the coin after chest is open
        response = "Nice."
      }
      else {
        response = "You can't do that."
      }
    }
    else if (
      move === "pick up key" ||
      move === "pick up the key" ||
      move === "take key" ||
      move === "take the key" ||
      move === "grab key" ||
      move === "grab the key") {
      if (key_pasted === true) {
        key_acquired = true; // only if you pick up the key after it's been pasted
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
      move === "eat some apple paste" ||
      move === "eat paste" ||
      move === "eat the paste" ||
      move === "eat some paste") {
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
      move === "use the apple paste with the ants" ||
      move === "use paste on ants" ||
      move === "use paste with ants" ||
      move === "use the paste on the ants" ||
      move === "use the paste with the ants") {
      response = "They like it. They carry it down the drain. They’re basically having an ant party."
    }
    // use on drain
    else if (
      move === "use apple paste on drain" ||
      move === "put apple paste in drain" ||
      move === "use the apple paste on the drain" ||
      move === "use the apple paste with the drain" ||
      move === "use paste on drain" ||
      move === "put paste in drain" ||
      move === "use the paste on the drain" ||
      move === "use the paste with the drain") {
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
      move === "throw the apple paste at the key" ||
      move === "use paste on key" ||
      move === "put paste on key" ||
      move === "use paste with key" ||
      move === "use the paste on the key" ||
      move === "use the paste with the key" ||
      move === "throw paste at key" ||
      move === "throw the paste at the key") {
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
      move === "use the apple paste on the walls" ||
      move === "use paste on right wall" ||
      move === "use paste on left wall" ||
      move === "use paste on back wall" ||
      move === "use paste on wall" ||
      move === "use the paste on a wall" ||
      move === "use the paste on the walls" ||
      move === "throw apple paste") {
      response = "That was definitely an improvement to the wall."
    }
    // use options for coin
    // use on door
    else if (
      move === "use coin on door" ||
      move === "use coin with door" ||
      move === "use the coin on the door" ||
      move === "use the coin with the door") {
      if (coin_acquired === true) {
        coin_bent = true;
        response = "The coin is now bent coin."
      }
      else {
        response = "You don't have a coin."
      }
    }
    else {
      response = "You can't do that."
    }

  }

  else {
    response = "You should not be here."
  };

  // logs tweet
  $( ".command" ).prepend( "<li class='list-group-item' data-position='" + position + "'>@mknepprath " + tweet + "</li>" );
  // logs response
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-info'>@familiarlilt " + response + "</li>" );
  // clears tweet
  $('#move').val('');

  // update cookies
  Cookies.set('position', position);
  Cookies.set('chestopen', chest_open);
  Cookies.set('coinacquired', coin_acquired);
  Cookies.set('coinbent', coin_bent);
  Cookies.set('keypasted', key_pasted);
  Cookies.set('keyacquired', key_acquired);

});

$("#move").keyup(function(e){
    if(e.keyCode == 13)
    {
        $("#tweet").click()
    }
});

// reset button, deletes cookie & refreshes page
$( "#reset" ).click(function() {
  Cookies.remove('position');
  Cookies.remove('chestopen');
  Cookies.remove('coinacquired');
  Cookies.remove('coinbent');
  Cookies.remove('keypasted');
  Cookies.remove('keyacquired');
  location.reload();
});
