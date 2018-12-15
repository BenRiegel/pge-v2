//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewOptionContainerView(key){

  //private code block ---------------------------------------------------------

  var container = new NodeInstance('div');
  container.className = 'option';
  container.dataset = {key};

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    setNormalBorder: function(){
      container.updateClassList('borderRadius', null);
    },
    setRoundedBorder: function(){
      container.updateClassList('borderRadius', 'rounded');
    },
    show: function(){
      container.setStyle('visibility', 'visible');
    },
    hide: function(){
      container.setStyle('visibility', 'hidden');
    },
    setOpaque: function(){
      container.setStyle('opacity', '1');
    },
    setTransparent: function(){
      container.setStyle('opacity', '0');
    },
    setExpandedHeight: function(){
      var expandedHeight = container.getComputedStyle('line-height');  //this doesn't work
      container.setStyle('height', '25px');
    },
    setContractedHeight: function(){
      container.setStyle('height', '0');
    },
    expandHeight: async function(){
      await container.transitionSetStyle('height', '25px');
    },
    contractHeight: async function(){
      await container.transitionSetStyle('height', '0px');
    },
    fadeOut: async function(){
      await container.transitionSetStyle('opacity', '0');
    },
    fadeIn: async function(){
      await container.transitionSetStyle('opacity', '1');
    },
    pause: async function(){
      await container.animateAddClass('paused');
      container.removeClassName('paused');
    },
  }
}
