//imports ----------------------------------------------------------------------

import { transitionSetStyle } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewContentContainerView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'report-content';

  //public api -----------------------------------------------------------------

  return {
    node,
    setOpaque: function(){
      node.style.opacity = '1';
    },
    setTransparent: function(){
      node.style.opacity = '0';
    },
    fadeIn: async function(){
      node.style.transition = 'opacity 0.5s';
      await transitionSetStyle(node, 'opacity', '1');
      node.style.transition = '';
    },
    fadeOut: async function(){
      node.style.transition = 'opacity 0.5s';
      await transitionSetStyle(node, 'opacity', '0');
      node.style.transition = '';
    },
  }
}
