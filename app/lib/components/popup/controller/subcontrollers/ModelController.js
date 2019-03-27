export default function PopupModelController(model, dispatcher){

  //define event reactions -----------------------------------------------------

  var onSetContent = function(content){
    model.set('content', content);
  }

  var onOpen = function(){
    model.set('isOpen', true);
  };

  var onClose = function(){
    model.set('isOpen', false);
  };

  var onExpand = function(){
    model.set('isExpanded', true);
  };

  var onContract = function(){
    model.set('isExpanded', false)
  }

  var onContractAndClose = function(){
    model.set('isExpanded', false);
    model.set('isOpen', false);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'setContent', onSetContent);
  dispatcher.setListener('model', 'open', onOpen);
  dispatcher.setListener('model', 'close', onClose);
  dispatcher.setListener('model', 'expand', onExpand);
  dispatcher.setListener('model', 'contract', onContract);
  dispatcher.setListener('model', 'contractAndClose', onContractAndClose);

}
