export default function PopupReportViewStateController(view, dispatcher){

  //define reactions -----------------------------------------------------------

  var onResetLoadingStatus = function(){
    view.state.contentHasLoaded = false;
  };

  var onOpen = function(){
    view.state.contentHasLoaded = true;
  };

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewState', 'resetLoadingStatus', onResetLoadingStatus);
  dispatcher.setListener('viewState', 'open', onOpen);

}
