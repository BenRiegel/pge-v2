export default function PopupSummaryDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { closeButton, readMore } = nodes;

  var onCloseButtonClick = function(){
    dispatcher.doAction('closeRequest');
  };

  var onReadMoreClick = function(){
    dispatcher.doAction('readMoreRequest');
  };

  //public api -----------------------------------------------------------------

  closeButton.setListener('click', onCloseButtonClick);
  readMore.setListener('click', onReadMoreClick);

}
