//imports ----------------------------------------------------------------------

import { transitionSetStyle } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewBackgroundView(){

  //private code block ---------------------------------------------------------

  const TRANSITION_DURATION = '0.75';

  var node = document.createElement('div');
  node.className = 'loader-background';

  //public api -----------------------------------------------------------------

  return {
    node,
    show: function(){
      node.style.visibility = 'visible';
    },
    hide: function(){
      node.style.visibility = 'hidden';
    },
    setOpaque: function(){
      node.style.opacity = '1';
    },
    fadeOut: async function(){
      node.style.transition = `opacity ${TRANSITION_DURATION}s`;
      await transitionSetStyle(node, 'opacity', '0');
      node.style.transition = '';
    },
  }

}
