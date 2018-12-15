//imports ----------------------------------------------------------------------

import NewLoader from '../loader/Loader.js';
import NewContainerView from './views/ContainerView.js';
import NewContentContainerView from './views/ContentContainerView.js';
import NewIframeView from './views/IframeView.js';
import NewCloseButton from '../close_button/CloseButton.js';
import NewContractButton from '../contract_button/ContractButton.js';
import NewDomController from './controllers/DomController.js';
import NewEventsController from './controllers/EventsController.js';


//exports ----------------------------------------------------------------------

export default function NewPopupReport(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
    contentIsLoaded: undefined,
    projectUrl: undefined,
  }

  var view = {
    container: NewContainerView(),
    loader: NewLoader(),
    contentContainer: NewContentContainerView(),
    closeButton: NewCloseButton(),
    contractButton: NewContractButton(),
    iframe: NewIframeView(),
  };

  var controller = {
    dom: NewDomController(view),
    events: NewEventsController(state, view),
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.node,
    addListener: controller.events.addListener,
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
    },
  };

}
