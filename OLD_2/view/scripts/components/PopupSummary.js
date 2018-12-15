//imports ----------------------------------------------------------------------

import { waitAtLeast, getDimensions } from '../lib/ViewUtils.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import Deferred from '../lib/Deferred.js';
import NodeInstance from '../lib/NodeInstance.js';
import NewSummaryContent from './PopupSummaryContent.js';
import NewLoader from './Loader.js';
import '../../stylesheets/popup_summary_container.scss';


//exports ----------------------------------------------------------------------

export default function NewPopupSummary(closeAction, expandAction){

  // state ---------------------------------------------------------------------

  var windowIsLoaded,
      imageIsLoaded;
  var currentDimensions,
      parentDimensions;

  // view ----------------------------------------------------------------------

  var onImageLoad = function(){
    imageIsLoaded.resolve();
  }

  var arrow = new NodeInstance('div');
  arrow.className = 'arrow';
  var loader = NewLoader();
  var popupSummaryContent = NewSummaryContent(onImageLoad, closeAction, expandAction);
  var popupBody = new NodeInstance('div');
  popupBody.className = 'popup-body';
  addChildrenTo(popupBody, [loader, popupSummaryContent]);
  var container = new NodeInstance('div');
  container.className = 'summary-window';
  addChildrenTo(container, [popupBody, arrow]);

  var loadContent = async function(){
    await waitAtLeast(500, async () => {
      await imageIsLoaded.promise;
      popupSummaryContent.resizeImage();
    });
    loader.stopAnimation();
    await popupSummaryContent.resizeWindow();
    loader.hideBackground();
    windowIsLoaded = true;
  }

  var animateContract = async function(){
    var animationTime = '0.75s';
    var node = container.rootNode;
    node.style.transition = `left ${animationTime}, width ${animationTime}, height ${animationTime}`;
    await new Promise( resolve => {
      setTimeout(resolve, 0);
    });
    var pl = container.transitionSetStyle('left', `${currentDimensions.left}px`);
    var pw = container.transitionSetStyle('width', `${currentDimensions.width}px`);
    var ph = container.transitionSetStyle('height', `${currentDimensions.height}px`);
    await Promise.all( [pl, pw, ph] );
    node.classList.remove('expanded');
    node.style.transition = '';
  }

  var resetContainerStyle = async function(){
    container.setStyle('left', '');
    container.setStyle('height', '');
    container.setStyle('width', '');
    container.removeClassName('expanded');
  }

  var expand = async function(){
    var node = container.rootNode;
    node.classList.add('expanded');
    currentDimensions = getDimensions(node);
    parentDimensions = getDimensions(node.parentNode);
    container.setStyle('left', `${currentDimensions.left}px`);
    container.setStyle('width', `${currentDimensions.width}px`);
    container.setStyle('height', `${currentDimensions.height}px`);
    var animationTime = '0.75s';
    node.style.transition = `left ${animationTime}, width ${animationTime}, height ${animationTime}`;
    await new Promise( resolve => {
      setTimeout(resolve, 0);
    });
    var pl = container.transitionSetStyle('left', `0px`);
    var pw = container.transitionSetStyle('width', `${parentDimensions.width}px`);
    var ph = container.transitionSetStyle('height', `${parentDimensions.height}px`);
    await Promise.all( [pl, pw, ph] );
    node.style.transition = '';
  }

  var contract = async function(isAnimating){
    if (isAnimating){
      await animateContract();
    }
    resetContainerStyle();
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    startLoading: function(){
      loader.activate();
      windowIsLoaded = false;
      imageIsLoaded = new Deferred();
      popupSummaryContent.resetWindowSize();
    },
    onIsOpenChange: async function(isOpen){
      if (isOpen){
        popupSummaryContent.resetOpacity();
        container.setStyle('visibility', 'visible');
        if (windowIsLoaded === false){
          await loadContent();
        }
        await popupSummaryContent.fadeUp();
      } else {
        container.setStyle('visibility', 'hidden');
      }
    },
    onIsExpandedChange: async function(isExpanded, isAnimating){
      if (isExpanded){
        await popupSummaryContent.fadeDown(isAnimating);
        await expand();
      } else {
        await contract(isAnimating);
        await popupSummaryContent.fadeUp(isAnimating);
      }
    },
    updateContent: popupSummaryContent.updateContent,
  }

}
