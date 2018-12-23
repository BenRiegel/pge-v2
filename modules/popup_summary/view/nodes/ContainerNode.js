//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import { getDimensions, transitionSetStyle } from '../../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'summary-window';

  //public api -----------------------------------------------------------------

  return {
    node,
    show: function(){
      node.style.visibility = 'visible';
    },
    hide: function(){
      node.style.visibility = 'hidden';
    },
    setExpandedZIndex: function(){
      node.classList.add('expanded');
    },
    setContractedZIndex: function(){
      node.classList.remove('expanded');
    },
    getDimensions: function(){
      return getDimensions(node);
    },
    setCurrentDimensions: function(currentDimensions){
      node.style.left = `${currentDimensions.left}px`;
      node.style.width = `${currentDimensions.width}px`;
      node.style.height = `${currentDimensions.height}px`;
    },
    resetDimensions: async function(){
      node.style.left = '';
      node.style.height = '';
      node.style.width = '';
    },
    animateContract: async function(currentDimensions){
      var pl = transitionSetStyle(node, 'left', `${currentDimensions.left}px`);
      var pw = transitionSetStyle(node, 'width', `${currentDimensions.width}px`);
      var ph = transitionSetStyle(node, 'height', `${currentDimensions.height}px`);
      await Promise.all( [pl, pw, ph] );
    },
    animateExpand: async function(parentDimensions){
      var pl = transitionSetStyle(node, 'left', `0px`);
      var pw = transitionSetStyle(node, 'width', `${parentDimensions.width}px`);
      var ph = transitionSetStyle(node, 'height', `${parentDimensions.height}px`);
      await Promise.all( [pl, pw, ph] );
    },
  }

}
