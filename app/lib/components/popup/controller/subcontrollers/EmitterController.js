export default function PopupEmitterController(emitter, dispatcher){

  //define event reactions -----------------------------------------------------

  var onClose = function(){
    emitter.notify('closed');
  }

  var onExpand = function(){
    emitter.notify('expansionStart');
  }

  var onContract = function(){
    emitter.notify('contractionEnd');
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('emitter', 'close', onClose);
  dispatcher.setListener('emitter', 'expand', onExpand);
  dispatcher.setListener('emitter', 'contract', onContract);
  dispatcher.setListener('emitter', 'contractAndClose', onClose);

}
