// logs reply
function reply(type, message) {
  $( ".command" ).prepend( "<li class='list-group-item list-group-item-" + type + "'>" + message + "</li>" )
};
// gets any cookies, sets rest to default state
function checkcookies(item, type, message) {
  if (!(Cookies.get(item))) {
    Cookies.set(item, false)
    return false;
  }
  else {
    if (JSON.parse(Cookies.get(item)) === true) {
      reply(type, message)
    };
    return JSON.parse(Cookies.get(item))
  }
};
