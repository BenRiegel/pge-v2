//module code block ------------------------------------------------------------

var tagsReceived = new Promise(async resolve => {
  var response = await fetch('./app/data/tags.json');
  var tags = await response.json();
  resolve(tags);
});


//exports ----------------------------------------------------------------------

export async function getOptionPropsList(){
  var tagsList = await tagsReceived;
  var optionPropsList = [];
  for (var tag of tagsList){
     var optionProps = {
       key: tag.name,
       name: tag.name,
       count: tag.count,
       labelIsIndented: tag.labelIsIndented
     };
    optionPropsList.push(optionProps);
  }
  return optionPropsList;
}
