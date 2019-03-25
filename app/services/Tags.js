//module code block ------------------------------------------------------------

var tagsReceived = new Promise(async resolve => {
  var response = await fetch('./app/data/tags.json');
  var tags = await response.json();
  resolve(tags);
});


//exports ----------------------------------------------------------------------

export async function getOptionsData(){
  var tagsList = await tagsReceived;
  var optionsDataList = [];
  for (var tag of tagsList){
    var optionsData = {
      key: tag.name,
      label: tag,
    }
    optionsDataList.push(optionsData);
  }
  return optionsDataList;
}
