export default function PopupDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { report, summary } = subcomponents;

  //define event reactions -----------------------------------------------------

  var onReadMoreRequest = function(){
    dispatcher.doAction('expand');
  }

  var onCloseRequest = function(){
    dispatcher.doAction('close');
  }

  var onContractRequest = function(){
    dispatcher.doAction('contract');
  }

  var contractAndCloseRequest = function(){
    dispatcher.doAction('contractAndClose');
  }

  //load event reactions -------------------------------------------------------

  summary.setEventListener('readMoreRequest', onReadMoreRequest);
  summary.setEventListener('closeRequest', onCloseRequest);
  report.setEventListener('contractRequest', onContractRequest);
  report.setEventListener('closeRequest', contractAndCloseRequest);

}
