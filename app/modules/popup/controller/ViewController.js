//imports ----------------------------------------------------------------------

import { POPUP_WIDTH, INIT_POPUP_HEIGHT, EXPANDED_MARGIN, ARROW_WIDTH } from '../config/PopupConfig.js';
import { waitAtLeast } from '../../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export default function ViewController(state, view, mapDimensions){

  //configure dom --------------------------------------------------------------

  view.nodes.container.appendChildNode(view.nodes.arrow.node);
  view.nodes.container.appendChildNode(view.nodes.arrowCover.node);
  view.nodes.arrowCover.appendChildNode(view.subcomponents.loader.rootNode);
  view.nodes.arrowCover.appendChildNode(view.nodes.summaryContent.node);
  view.nodes.summaryContent.appendChildNode(view.subcomponents.summaryCloseButton.rootNode);
  view.nodes.summaryContent.appendChildNode(view.nodes.title.node);
  view.nodes.summaryContent.appendChildNode(view.nodes.author.node);
  view.nodes.summaryContent.appendChildNode(view.nodes.image.node);
  view.nodes.summaryContent.appendChildNode(view.nodes.text.node);
  view.nodes.summaryContent.appendChildNode(view.nodes.readMore.node);
  view.nodes.arrowCover.appendChildNode(view.nodes.reportContent.node);
  view.nodes.reportContent.appendChildNode(view.nodes.iframe.node);
  view.nodes.reportContent.appendChildNode(view.subcomponents.reportCloseButton.rootNode);
  view.nodes.reportContent.appendChildNode(view.subcomponents.reportContractButton.rootNode);

  //define state change reactions ----------------------------------------------

  var adjustedHeight;   //do something about this

  var updateContainerVisibility = function(){
    if (state.isOpen){
      view.nodes.container.setVisible();
    } else {
      view.nodes.container.setHidden();
    }
  }

  var containerTransitionToAdjustedHeight = function(){
    var offsetHeight = view.nodes.summaryContent.node.clientHeight;
    var scrollHeight = view.nodes.summaryContent.node.scrollHeight;
    adjustedHeight = scrollHeight;
    var deltaHeight = scrollHeight - offsetHeight;
    var transitionTime = Math.abs(3 * deltaHeight);
    return view.nodes.container.transitionAdjustHeight(scrollHeight, transitionTime);
  }

  var containerExpand = function(){
    var newHeight = mapDimensions.height - 2 * EXPANDED_MARGIN;
    var newWidth = mapDimensions.width - 2 * EXPANDED_MARGIN;
    var newLeft = EXPANDED_MARGIN;
    return view.nodes.container.transitionDimensions(newHeight, newWidth, newLeft);
  }

  var containerContract = function(){
    var newLeft = mapDimensions.width / 2 - POPUP_WIDTH - ARROW_WIDTH;
    var newWidth = POPUP_WIDTH;
    var newHeight = adjustedHeight;
    return view.nodes.container.transitionDimensions(newHeight, newWidth, newLeft);
  }

  var containerSetContracted = function(){
    var left = mapDimensions.width / 2 - POPUP_WIDTH - ARROW_WIDTH;
    view.nodes.container.setStyle('left', `${left}px`);
    view.nodes.container.setStyle('height', `${INIT_POPUP_HEIGHT}px`);
    view.nodes.container.setStyle('width', `${POPUP_WIDTH}px`);
  }

  var updateContainerDimensions = function(){
    if (state.isOpen){
      if (state.isExpanded){
        return containerExpand();
      } else {
        return containerContract();
      }
    } else {
      containerSetContracted();
    }
  }

  var updateContainerZIndex = function(){
    if (state.isExpanded){
      view.nodes.container.setExpandedZIndex();
    } else {
      view.nodes.container.setContractedZIndex();
    }
  }

  var updateArrowDisplay = function(){
    if (state.isExpanded){
      view.nodes.arrow.setStyle('display', 'none');
    } else {
      view.nodes.arrow.setStyle('display', 'block')
    }
  }

  var updateTitle = function(){
    view.nodes.title.innerHTML = state.content.projectName;
  };

  var updateAuthor = function(){
    var { author, university, year } = state.content;
    if (author){
      view.nodes.author.innerHTML = `by ${author}, ${university} University, ${year}`;
    } else {
      view.nodes.author.innerHTML = `written at ${university} University in ${year}`;
    }
  };

  var updateText = function(){
    view.nodes.text.innerHTML = state.content.introText + ' . . . ';
  };

  var loadImage = function(){
    return view.nodes.image.setSrc(state.content.introImageUrl);
  }

  var resizeImage = function(){
    view.nodes.image.resize();
  }

  var loadIframe = function(){
    return view.nodes.iframe.setSrc(state.content.url);
  }

  var startLoading = function(){
    view.subcomponents.loader.activate();
  }

  var endLoading = function(){
    view.subcomponents.loader.terminate();
  }

  var resetSummaryLoadedStatus = function(){
    view.summaryContentHasLoaded = false;
  }

  var resetReportLoadedStatus = function(){
    view.reportContentHasLoaded = false;
  }

  var updateSummaryContent = async function(){
    if (!view.summaryContentHasLoaded){
      startLoading();
      await waitAtLeast(500, async() => {
        updateTitle();
        updateAuthor();
        updateText();
        await loadImage();
        resizeImage();
      });
      endLoading();
      view.summaryContentHasLoaded = true;
    }
  }

  var updateReportContent = async function(){
    if (!view.reportContentHasLoaded){
      startLoading();
      await loadIframe();
      endLoading();
      view.reportContentHasLoaded = true;
    }
  }

  var updateSummaryOpacity = async function(){
    if (state.isOpen){
      if (state.isExpanded){
        return view.nodes.summaryContent.transitionToTransparent();
      } else {
        return view.nodes.summaryContent.transitionToOpaque();
      }
    } else {
      view.nodes.summaryContent.setTransparent();
    }
  }

  var updateReportOpacity = async function(){
    if (state.isOpen){
      if (state.isExpanded){
        return view.nodes.reportContent.transitionToOpaque();
      } else {
        return view.nodes.reportContent.transitionToTransparent();
      }
    } else {
      view.nodes.reportContent.setTransparent();
    }
  }

  var broadcastPrivate = function(...args){
    if (view.props.inputEnabled && !view.props.updateInProgress){
      view.emitter.private.broadcast(...args);
    }
  }

  var broadcastPublic = function(eventInProgress){
    if (eventInProgress){
      console.log('eventStart');
      view.emitter.public.broadcast('eventStart');
    } else {
      console.log('eventEnded');
      view.emitter.public.broadcast('eventEnd');
    };
  }

  var broadcastPublicIsOpen = function(){
    var message = state.isOpen ? 'isOpen' : 'isClosed';
    console.log(message);
    view.emitter.public.broadcast(message);
  }

  //load state change reactions ------------------------------------------------

  state.addListenerByType('isOpen', 'containerVisibility', updateContainerVisibility);
  state.addListenerByType('isOpen', 'summaryContent', updateSummaryContent);
  state.addListenerByType('isOpen', 'containerHeightAjust', containerTransitionToAdjustedHeight);
  state.addListenerByType('isOpen', 'containerDimensions', updateContainerDimensions);
  state.addListenerByType('isOpen', 'summaryOpacity', updateSummaryOpacity);
  state.addListenerByType('isOpen', 'publicEmitter', broadcastPublicIsOpen);

  state.addListenerByType('isExpanded', 'summaryOpacity', updateSummaryOpacity);
  state.addListenerByType('isExpanded', 'containerDimensions', updateContainerDimensions);
  state.addListenerByType('isExpanded', 'arrowDisplay', updateArrowDisplay);
  state.addListenerByType('isExpanded', 'containerZIndex', updateContainerZIndex);
  state.addListenerByType('isExpanded', 'reportContent', updateReportContent);
  state.addListenerByType('isExpanded', 'reportOpacity', updateReportOpacity);
  state.addListenerByType('isExpanded', 'eventInProgress', broadcastPublic);

  state.addListener('content', resetSummaryLoadedStatus);
  state.addListener('content', resetReportLoadedStatus);

  view.nodes.readMore.setEventListener('click', broadcastPrivate);
  view.subcomponents.summaryCloseButton.addListener('click', broadcastPrivate);
  view.subcomponents.reportCloseButton.addListener('click', broadcastPrivate);
  view.subcomponents.reportContractButton.addListener('click', broadcastPrivate);

  //init -----------------------------------------------------------------------

  updateContainerVisibility();
  updateSummaryOpacity();
  updateReportOpacity();
  updateContainerDimensions();
  updateArrowDisplay();
  updateContainerZIndex();

}
