export default function PopupReportDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { closeButton, contractButton } = nodes;

  //define event reactions -------------------------------------------------------------

  var onCloseButtonClick = function(){
    dispatcher.doAction('closeRequest');
  };

  var onContractClick = function(){
    dispatcher.doAction('contractRequest');
  };

  //load reactions -------------------------------------------------------------

  closeButton.setListener('click', onCloseButtonClick);
  contractButton.setListener('click', onContractClick);

}
