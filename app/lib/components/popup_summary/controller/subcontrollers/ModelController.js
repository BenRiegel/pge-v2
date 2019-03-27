export default function PopupSummaryModelController(model, dispatcher){

  //define reactions -----------------------------------------------------------

  var onResetLoadingStatus = function(){
    model.set('loadingStatus', null);
  }

  var onPrepLoading = function(){
    if (model.loadingStatus === null){
      model.set('loadingStatus', 'prepping');
    }
  }

  var onLoading = function(){
    if (model.loadingStatus === 'prepping'){
      model.set('loadingStatus', 'loading');
    }
  }

  var onFinishLoading = function(){
    if (model.loadingStatus === 'loading'){
      model.set('loadingStatus', 'done');
    }
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'resetLoadingStatus', onResetLoadingStatus);
  dispatcher.setListener('model', 'prepLoading', onPrepLoading);
  dispatcher.setListener('model', 'loading', onLoading);
  dispatcher.setListener('model', 'finishLoading', onFinishLoading);

}
