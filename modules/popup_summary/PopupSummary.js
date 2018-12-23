//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../lib/Utils.js';
import Deferred from '../../lib/Deferred.js';
import Loader from '../loader/Loader.js';
import ContainerNode from './view/nodes/ContainerNode.js';
import ArrowNode from './view/nodes/ArrowNode.js';
import BodyNode from './view/nodes/BodyNode.js';
import ContentContainerNode from './view/nodes/ContentContainerNode.js';
import AuthorNode from './view/nodes/AuthorNode.js';
import TitleNode from './view/nodes/TitleNode.js';
import ImageNode from './view/nodes/ImageNode.js';
import TextNode from './view/nodes/TextNode.js';
import ReadMoreTextNode from './view/nodes/ReadMoreTextNode.js';

import PopupButton from '../popup_button/PopupButton.js';
import NewEventsController from './controllers/EventsController.js';
import NewDomController from './controllers/DomController.js';
import NewContentController from './controllers/ContentController.js';


//exports ----------------------------------------------------------------------

export default function PopupSummary(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
    contentIsLoaded: undefined,
    hasLoaded: undefined,
    contractedDimensions: undefined,
  }

  var view = {
    container: new ContainerNode(),
    arrow: new ArrowNode(),
    body: new BodyNode(),
    loader: new Loader(),
    contentContainer: new ContentContainerNode(),
    closeButton: new PopupButton({
          containerClassName: 'summary-close-button',
          iconClassName: 'fa-times'}),
    author: new AuthorNode(),
    title: new TitleNode(),
    image: new ImageNode(),
    text: new TextNode(),
    readMoreText: new ReadMoreTextNode(),
  };

  var controller = {
    dom: NewDomController(view),
    events: NewEventsController(state, view),
    content: NewContentController(state, view),
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
    open: function(){
      view.container.show();
    },
    close: function(){
      view.container.hide();
      view.contentContainer.setTransparent();
      view.contentContainer.resetHeight();
    },
    loadNewProjectData: async function(projectData){
      state.contentIsLoaded = false;
      state.hasLoaded = new Deferred();
      await controller.content.updateContent(projectData);
      state.contentIsLoaded = true;
      state.hasLoaded.resolve();
    },
    waitIfContentLoading: async function(){
      if (state.contentIsLoaded === false){
        view.loader.show();
        await waitAtLeast(500, state.hasLoaded.promise);
        view.loader.hide( {fadeOut:false} );
      }
    },
    expandContentHeight: async function(){
      await view.contentContainer.expandHeight();
    },
    fadeInContent: async function(){
      await view.contentContainer.fadeIn();
    },
    fadeOutContent: async function(){
      await view.contentContainer.fadeOut();
    },
    animateExpand: async function(parentDimensions){
      view.arrow.setNoDisplay();
      view.container.setExpandedZIndex();
      state.contractedDimensions = view.container.getDimensions();
      view.container.setCurrentDimensions(state.contractedDimensions);
      await view.container.animateExpand(parentDimensions);
    },
    animateContract: async function(){
      await view.container.animateContract(state.contractedDimensions);
      view.container.resetDimensions();
      view.arrow.display();
      view.container.setContractedZIndex();
    },
    setContracted: function(){
      view.container.resetDimensions();
      view.arrow.display();
      view.container.setContractedZIndex();
    },
  };

}
