export default function PopupDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { report, summary } = subcomponents;

  //define event reactions -----------------------------------------------------

  var onReadMoreRequest = function(){
    dispatcher.newAsyncAction('expand');
  }

  var onCloseRequest = function(){
    dispatcher.newAction('close');
  }

  var onContractRequest = function(){
    dispatcher.newAsyncAction('contract');
  }

  var contractAndCloseRequest = function(){
    dispatcher.newAction('contractAndClose');
  }

  //load event reactions -------------------------------------------------------

  summary.setEventListener('readMoreRequest', onReadMoreRequest);
  summary.setEventListener('closeRequest', onCloseRequest);
  report.setEventListener('contractRequest', onContractRequest);
  report.setEventListener('closeRequest', contractAndCloseRequest);

}
