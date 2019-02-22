//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/container.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(popupState, summaryState){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'summary-window');

  container.saveCurrentDimensions = function(){
    container.contractedDimensions = container.getDimensions();
  }

  container.unsetDimensions = function(){
    container.unsetStyle('left');
    container.unsetStyle('width');
    container.unsetStyle('height');
  }

  container.animateExpand = async function(){
    var fromLeft = `${container.contractedDimensions.left}px`;
    var fromWidth = `${container.contractedDimensions.width}px`;
    var fromHeight = `${container.contractedDimensions.height}px`;
    var toLeft = '0px';
    var toWidth = container.getComputedStyle('max-width');
    var toHeight = container.getComputedStyle('max-height');
    var pl = container.transitionSetStyle('left', fromLeft, toLeft);
    var pw = container.transitionSetStyle('width', fromWidth, toWidth);
    var ph = container.transitionSetStyle('height', fromHeight, toHeight);
    await Promise.all( [pl, pw, ph] );
  };

  container.animateContract = async function(){
    var fromLeft = container.getStyle('left');
    var fromWidth = container.getStyle('width');
    var fromHeight = container.getStyle('height');
    var toLeft = `${container.contractedDimensions.left}px`;
    var toWidth = `${container.contractedDimensions.width}px`;
    var toHeight = `${container.contractedDimensions.height}px`;
    var pl = container.transitionSetStyle('left', fromLeft, toLeft);
    var pw = container.transitionSetStyle('width', fromWidth, toWidth);
    var ph = container.transitionSetStyle('height', fromHeight, toHeight);
    await Promise.all( [pl, pw, ph] );
  };

  container.setExpandedZIndex = function(){
    container.addClass('expanded');
  };

  container.setContractedZIndex = function(){
    container.removeClass('expanded');
  };

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (summaryState.isVisible){
      container.setVisibility('visible');
    } else {
      container.setVisibility('hidden');
    }
  }

  var updateDimensions = async function(){
    if (summaryState.isExpanded){
      container.saveCurrentDimensions();
      await container.animateExpand();
    } else {
      if (popupState.isOpen){
        await container.animateContract();
      }
      container.unsetDimensions();
    }
  }

  var updateZIndex = function(){
    if (summaryState.isExpanded){
      container.setExpandedZIndex();
    } else {
      container.setContractedZIndex();
    }
  }

  //load reactions -------------------------------------------------------------

  summaryState.addListener('isVisible', 'container', 'visibility', updateVisibility);
  summaryState.addListener('isExpanded', 'container', 'dimensions', updateDimensions);
  summaryState.addListener('isExpanded', 'container', 'zIndex', updateZIndex);

  //init dom element -----------------------------------------------------------

  updateVisibility();
  updateDimensions();
  updateZIndex();

  //public api -----------------------------------------------------------------

  return container;

}
