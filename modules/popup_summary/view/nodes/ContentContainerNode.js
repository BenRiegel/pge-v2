//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import { transitionSetStyle } from '../../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function ContentContainerNode(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'summary-content';

  //public api -----------------------------------------------------------------

  return {
    node,
    setTransparent: function(){
      node.style.opacity = '0';
    },
    setOpaque: function(){
      node.style.opacity = '1';
    },
    fadeOut: async function(){
      node.style.transition = 'opacity 0.5s';
      await transitionSetStyle(node, 'opacity', '0');
      node.style.transition = '';
    },
    fadeIn: async function(){
      node.style.transition = 'opacity 0.5s';
      await transitionSetStyle(node, 'opacity', '1');
      node.style.transition = '';
    },
    expandHeight: async function(){
      var offsetHeight = node.clientHeight;
      var scrollHeight = node.scrollHeight;
      var deltaHeight = scrollHeight - offsetHeight;
      var transitionTime = 3 * deltaHeight;
      node.style.height = `${offsetHeight}px`;
      node.style.transition = `height ${transitionTime}ms`;
      await transitionSetStyle(node, 'height', `${scrollHeight}px`);
      node.style.transition = '';
    },
    resetHeight: function(){
      node.style.height = '';
    },
  }

}
