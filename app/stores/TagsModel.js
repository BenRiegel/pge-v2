//module code block ------------------------------------------------------------

var tagsReceived = new Promise(async resolve => {
  var response = await fetch('./app/assets/data/tags.json');
  var tags = await response.json();
  resolve(tags);
});


//exports ----------------------------------------------------------------------

export { tagsReceived };
