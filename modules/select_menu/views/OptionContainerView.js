//imports ----------------------------------------------------------------------

import { transitionSetStyle, animateAddClass } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewOptionContainerView(key){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'option';
  node.dataset.key = key;

  //public api -----------------------------------------------------------------

  return {
    node,
    setRoundedBorder: function(){
      node.classList.add('rounded');
    },
    setDefaultBorder: function(){
      node.classList.remove('rounded');
    },
    show: function(){
      node.style.visibility = 'visible';
    },
    hide: function(){
      node.style.visibility = 'hidden';
    },
    setOpaque: function(){
      node.style.opacity = '1';
    },
    setTransparent: function(){
      node.style.opacity = '0';
    },
    setExpanded: function(){
      node.classList.add('expanded');
    },
    setContracted: function(){
      node.classList.remove('expanded');
    },
    transitionToOpaque: async function(){
      await transitionSetStyle(node, 'opacity', '1');
    },
    transitionToTransparent: async function(){
      await transitionSetStyle(node, 'opacity', '0');
    },
    animateExpand: async function(){
      node.classList.add('expanded');
      await animateAddClass(node, 'animate-expand');
      node.classList.remove('animate-expand');
    },
    animateContract: async function(){
      node.classList.remove('expanded');
      await animateAddClass(node, 'animate-contract');
      node.classList.remove('animate-contract');
    }
  }
}
