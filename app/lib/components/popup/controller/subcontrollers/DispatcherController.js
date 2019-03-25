export default function PopupDispatcherController(dispatcher, model, view){

  var { subcomponents } = view;
  var { report, summary } = subcomponents;

  //define reactions -----------------------------------------------------------

  var onReadMoreRequest = function(){
    dispatcher.newAsyncAction('expand');
  }

  var onCloseRequest = function(){
    dispatcher.newAction('close');
  }

  var onContractRequest = function(){
    dispatcher.newAsyncAction('contract');
  }

  //load reactions -------------------------------------------------------------

  summary.setEventListener('readMoreRequest', onReadMoreRequest);
  summary.setEventListener('closeRequest', onCloseRequest);
  report.setEventListener('contractRequest', onContractRequest);
  report.setEventListener('closeRequest', onCloseRequest);

}
