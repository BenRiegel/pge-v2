export default function PopupReportDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { closeButton, contractButton } = nodes;

  //define event reactions -------------------------------------------------------------

  var onCloseButtonClick = function(){
    dispatcher.newAction('closeRequest');
  };

  var onContractClick = function(){
    dispatcher.newAction('contractRequest');
  };

  //load reactions -------------------------------------------------------------

  closeButton.setListener('click', onCloseButtonClick);
  contractButton.setListener('click', onContractClick);

}
