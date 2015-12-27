// PARSE
Parse.initialize("Beyi6l08p3QphWjpryXqnF66UN41wU7SFBwhFvQX", "FZmRAeAj3PRXFWiTY4C5KEWBwQgRLFchWX4uhACZ");

// get data from Parse for interactions
var Interactions = Parse.Object.extend("Interactions");
var intsquery = new Parse.Query(Interactions).limit(1000);
var interactions = [];
intsquery.find({
  success: function(ints) {
    console.log("Successfully retrieved " + ints.length + " interactions.");
    // create interactions array from Interactions in Parse
    for (var i in ints) {
      int = ints[i];
      interactions[i] = {};
      interactions[i].action = int.get('action');
      interactions[i].type = int.get('type');
      interactions[i].message = int.get('message');
      // get statuses from cookie, set rest to default
      interactions[i].status = checkcookies(interactions[i].action, interactions[i].type, interactions[i].message)
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

// get data from Parse for moves
var Moves = Parse.Object.extend("Moves");
var movesquery = new Parse.Query(Moves).limit(1000);
var moves = [];
movesquery.find({
  success: function(ms) {
    console.log("Successfully retrieved " + ms.length + " moves.");
    moves = ms;
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
})

// if no cookie, create it and set position, else get the position
if (!(Cookies.get('position'))) {
  var position = "start";
  Cookies.set('position', 'start');
  reply('warning', 'Tweet &quot;Start&quot; to play.')
}
else {
  var position = Cookies.get('position');
  if (Cookies.get('position') === 'start') {
    reply('warning', 'Tweet &quot;Start&quot; to play.')
  }
  else {
    reply('warning', 'Current position: ' + Cookies.get('position'))
  }
};

// when Tweet button is clicked...
$( "#tweet" ).click(function() {

  // playing lilt
  interactions[0].status = true; //playinglilt
  // grab tweet
  var tweet = $('#move').val();
  // sanitize tweet
  var move = tweet.toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  // logs tweet
  reply('', '@user ' + tweet)
  // clears tweet
  $('#move').val('');

  // stores tweet
  var dimensions = {
    // Define ranges to bucket data points into meaningful segments
    tweet: tweet,
  };
  // Send the dimensions to Parse along with the 'search' event
  Parse.Analytics.track('tweets', dimensions);

  var condition = 0;
  var response = "";
  // loop through moves
  for (var i in moves) {
    // assign current move to m
    m = moves[i];
    // if user entry matches move AND current position matches required position AND condition is true (like playinglilt or chestopen), get all info for move with highest condition. not sure if this makes sense, but it works so far
    if (move === m.get('move') && position === m.get('position') && interactions[m.get('condition')].status === true) {
      if (m.get('condition') >= condition) {
        condition = m.get('condition');
        response = m.get('response');
        var trigger = m.get('trigger');
        var halt = m.get('halt')
      }
    }
  }
  // if there is a response for their move, reply
  if (response !== "") {
    reply('info', '@familiarlilt ' + response);
    // if this move triggers an interaction, trigger it
    if (trigger !== undefined) {
      interactions[trigger].status = true;
    }
    // if this move halts an interaction, halt it
    if (halt !== undefined) {
      interactions[halt].status = false;
    }
    // if they enter 'start' at start, change position - janky right now, probably should become a column in Moves similar to trigger
    if (move === "start" && position === "start") {
      position = "cell";
    }
  }
  // if no move was valid, reply with one of these error messages
  else {
    var response_options = ["You can't do that.", "That can't be done.", "Didn't work.", "Oops, can't do that.", "Sorry, you can't do that.", "That didn't work.", "Try something else.", "Sorry, you'll have to try something else.", "Oops, didn't work.", "Oops, try something else.", "Nice try, but you can't do that.", "Nice try, but that didn't work."];
    reply('info', '@familiarlilt ' + response_options[(Math.floor(Math.random() * response_options.length))]);
  }
  // update cookies
  for (var i in interactions) {
    Cookies.set(interactions[i].action, interactions[i].status)
  }
  Cookies.set('position', position);
});

// runs click function when "enter" key is pressed
$("#move").keyup(function(e){
  if(e.keyCode == 13) {
    $("#tweet").click()
  }
});

// reset button, deletes cookie & refreshes page
$("#reset").click(function() {
  for (var i in interactions) {
    Cookies.remove(interactions[i].action)
  };
  Cookies.remove('position');
  location.reload()
});
