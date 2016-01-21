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
      $( ".intslist" ).prepend( "<li class='list-group-item list-group-item-info'>" + i + " - " + interactions[i].action + "</li>" );
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

$('#action').bind('input', function() {
  if ($('#action').val() === "custom") {
    $('#custom').attr('disabled', false);
  }
  else {
    $('#custom').attr('disabled', true);
  }
});

$('#submit').click(function() {
  reply('warning', 'Submit pressed.')

  var lookat = [
    "look at",
    "look at the",
    "inspect",
    "inspect the"
  ];
  var pickup = [
    "pick up",
    "pick up the",
    "take",
    "take the",
    "grab",
    "grab the"
  ];
  var use = [
    "use",
    "use the"
  ];
  var open = [
    "open",
    "open the"
  ];
  var close = [
    "close",
    "close the",
    "shut",
    "shut the"
  ];
  var talkto = [
    "talk to",
    "talk to the"
  ];
  var push = [
    "push",
    "push the"
  ]
  var give = [
    "give",
    "give the"
  ]

  if ($('#action').val() === 'custom') {
    var action = [$('#custom').val()]
  }
  if ($('#action').val() === 'look at') {
    var action = lookat
  }
  else if ($('#action').val() === 'pick up') {
    var action = pickup
  }
  else if ($('#action').val() === 'use') {
    var action = use
  }
  else if ($('#action').val() === 'open') {
    var action = open
  }
  else if ($('#action').val() === 'close') {
    var action = close
  }
  else if ($('#action').val() === 'talk to') {
    var action = talkto
  }
  else if ($('#action').val() === 'push') {
    var action = push
  }
  else if ($('#action').val() === 'give') {
    var action = give
  }

  for (var i in action) {

    var Moves = Parse.Object.extend("Moves");
    var moves = new Moves();

    var object = $('#object').val();
    moves.set("move", action[i] + " " + object);

    var position = $('#location').val();
    moves.set("position", position);

    var response = $('#response').val();
    moves.set("response", response);

    if ($('#condition').val() !== "") {
      var condition = Number($('#condition').val());
      moves.set("condition", condition);
    }

    if ($('#trigger').val() !== "") {
      var trigger = Number($('#trigger').val());
      moves.set("trigger", trigger);
    }

    if ($('#halt').val() !== "") {
      var halt = Number($('#halt').val());
      moves.set("halt", halt);
    }

    reply('info', "Added '" + action[i] + " " + object + "'")

    moves.save(null, {
      success: function(moves) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + moves.id);
      },
      error: function(moves, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
  };
});
