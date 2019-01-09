//imports ----------------------------------------------------------------------

import ReportWindowState from './state/ReportWindowState.js';
import ReportWindowView from './view/ReportWindowView.js';


//exports ----------------------------------------------------------------------

export default function PopupReport(popupState){

  //private code block ---------------------------------------------------------

  var reportState = new ReportWindowState(popupState);
  var view = new ReportWindowView(popupState, reportState);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}



/*
enable: function(){
  state.isEnabled = true;
},
disable: function(){
  state.isEnabled = false;
},
open: async function(){
  view.container.show();
},
close: function(){
  view.container.hide();
  view.contentContainer.setTransparent();
},
setProjectUrl: function(url){
  state.projectUrl = url;
  state.contentIsLoaded = false;
},
waitIfContentLoading: async function(){
  if (state.contentIsLoaded === false){
    view.loader.show();
    await view.iframe.loadContent(state.projectUrl);
    state.contentIsLoaded = true;
    view.loader.hide( {fadeOut:false} );
  }
},
fadeInContent: async function(){
  await view.contentContainer.fadeIn();
},
fadeOutContent: async function(){
  await view.contentContainer.fadeOut();
},*/
