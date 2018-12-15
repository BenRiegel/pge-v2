//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../lib/Utils.js';
import Deferred from '../../lib/Deferred.js';
import NewLoader from '../loader/Loader.js';
import NewContainerView from './views/ContainerView.js';
import NewArrowView from './views/ArrowView.js';
import NewBodyView from './views/BodyView.js';
import NewContentContainerView from './views/ContentContainerView.js';
import NewAuthorView from './views/AuthorView.js';
import NewTitleView from './views/TitleView.js';
import NewImageView from './views/ImageView.js';
import NewTextView from './views/TextView.js';
import NewReadMoreTextView from './views/ReadMoreTextView.js';
import NewCloseButton from '../close_button/CloseButton.js';
import NewEventsController from './controllers/EventsController.js';
import NewDomController from './controllers/DomController.js';
import NewContentController from './controllers/ContentController.js';


//exports ----------------------------------------------------------------------

export default function NewPopupSummary(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
    contentIsLoaded: undefined,
    hasLoaded: undefined,
    contractedDimensions: undefined,
  }

  var view = {
    container: NewContainerView(),
    arrow: NewArrowView(),
    body: NewBodyView(),
    loader: NewLoader(),
    contentContainer: NewContentContainerView(),
    closeButton: NewCloseButton(),
    author: NewAuthorView(),
    title: NewTitleView(),
    image: NewImageView(),
    text: NewTextView(),
    readMoreText: NewReadMoreTextView(),
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
