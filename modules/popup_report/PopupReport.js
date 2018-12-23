//imports ----------------------------------------------------------------------

import Loader from '../loader/Loader.js';
import ContainerNode from './view/nodes/ContainerNode.js';
import ContentContainerNode from './view/nodes/ContentContainerNode.js';
import IframeNode from './view/nodes/IframeNode.js';

import PopupButton from '../popup_button/PopupButton.js';
import CloseButton from '../close_button/CloseButton.js';
import ContractButton from '../contract_button/ContractButton.js';
import NewDomController from './controllers/DomController.js';
import NewEventsController from './controllers/EventsController.js';


//exports ----------------------------------------------------------------------

export default function PopupReport(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
    contentIsLoaded: undefined,
    projectUrl: undefined,
  }

  var view = {
    container: new ContainerNode(),
    loader: new Loader(),
    contentContainer: new ContentContainerNode(),
    closeButton: new PopupButton({
      containerClassName: 'summary-close-button',
      iconClassName: 'fa-times'}),
    contractButton: new PopupButton({
      containerClassName: 'report-contract-button',
      iconClassName: 'fa-compress'}),
    iframe: new IframeNode(),
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
