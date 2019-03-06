//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/container.scss';


//module code block ------------------------------------------------------------

const TRANSITION_TIME = '0.75s';


//exports ----------------------------------------------------------------------

export default class ContainerNode extends DomNode{
  constructor(){
    super('div', 'popup-container');
  }

  async transitionDimensions(newHeight, newWidth, newLeft){
    var transitionStr = `height ${TRANSITION_TIME}, `;
    transitionStr += `width ${TRANSITION_TIME}, `;
    transitionStr += `left ${TRANSITION_TIME}`;
    this.setStyle('transition', transitionStr);
    var p1 = this.transitionSetStyle('height', `${newHeight}px`);
    var p2 = this.transitionSetStyle('width', `${newWidth}px`);
    var p3 = this.transitionSetStyle('left', `${newLeft}px`);
    await Promise.all([p1, p2, p3]);
    this.setStyle('transition', '');
  }

  async transitionAdjustHeight(newHeight, transitionDuration){
    this.setStyle('transition', `height ${transitionDuration}ms`);
    await this.transitionSetStyle('height', `${newHeight}px`);
    this.setStyle('transition', '');
  }

  async transitionProp(propName, newValue){
    this.setStyle('transition', `${propName} ${TRANSITION_TIME}`);
    await this.transitionSetStyle(propName, newValue);
    this.setStyle('transition', '');
  }

  setExpandedZIndex(){
    this.addClass('expanded-z');
  }

  setContractedZIndex(){
    this.removeClass('expanded-z');
  }
}



/*setContractedWidth(){
  this.setStyle('width', '400px');
}
setContractedHeight(){
  this.setStyle('height', '150px');
}
setContractedLeft(){
  var left = this.mapDimensions.width / 2 - 400 - 15;
  this.setStyle('left', `${left}px`);
}
setExpandedLeft(){
  this.setStyle('left', '15px');
}*/


/*  setExpandedHeight(){
    var height = this.mapDimensions.height - 15 * 2;
    this.setStyle('height', `${height}px`);
  }*/

/*  setExpandedWidth(){
    var width = this.mapDimensions.width - 15 * 2;
    this.setStyle('width', `${width}px`);
  }*/


/*  var container = new DomElement('div', 'summary-window');

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

  summaryState.addListener('isVisible', 'container - visibility', updateVisibility);
  summaryState.addListener('isExpanded', 'container - dimensions', updateDimensions);
  summaryState.addListener('isExpanded', 'container - zIndex', updateZIndex);

  //init dom element -----------------------------------------------------------

  updateVisibility();
  updateDimensions();
  updateZIndex();

  //public api -----------------------------------------------------------------

  return container;*/

  //return { node, props };

//}
