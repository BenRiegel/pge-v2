export default function SelectMenuEmitterController(emitter, dispatcher){

  //define reactions -----------------------------------------------------------

  /*var loadOptionsAction = function(optionsData){
    emitter.view.notify('newOptions', optionsData);
  }

  var clickedOptionAction = async function(selectedOptionKey){
    emitter.internalAction = true;
    await emitter.model.notify('optionClick', selectedOptionKey);
    if (model.newSelectedOption){
      emitter.public.notify('newSelectedOption', model.selectedOptionKey);
    }
    emitter.internalAction = false;
  }

  var selectedOptionAction = function(selectedOptionKey){
    emitter.model.notify('optionSelected', selectedOptionKey);
  }*/

  var broadcastNewOption = function(selectedOptionKey){
    emitter.notify('newSelectedOption', selectedOptionKey);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('public', 'newSelectedOption', broadcastNewOption);

  //view.nodes.root.onClick = clickedOptionAction;

  //public api -----------------------------------------------------------------

  //this.loadOptions = loadOptionsAction;

  //this.setSelectedOption = selectedOptionAction;

}
