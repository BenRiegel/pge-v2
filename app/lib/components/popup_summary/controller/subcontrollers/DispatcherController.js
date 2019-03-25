export default function PopupSummaryDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { closeButton, readMore } = nodes;

  var onCloseButtonClick = function(){
    dispatcher.newAction('closeRequest');
  };

  var onReadMoreClick = function(){
    dispatcher.newAction('readMoreRequest');
  };

  //public api -----------------------------------------------------------------

  closeButton.setListener('click', onCloseButtonClick);
  readMore.setListener('click', onReadMoreClick);

}
