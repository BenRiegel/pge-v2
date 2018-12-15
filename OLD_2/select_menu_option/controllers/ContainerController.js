export default function NewContainerController(state, container){

  //private code block ---------------------------------------------------------

  /*state.isSelected.addListener('container', currentValue => {
    if (currentValue === true){
      container.show();
      container.setExpandedHeight();
      container.setOpaque();
    }
  });*/

  //public api -----------------------------------------------------------------

  return {

    updateBorder: function(isOpen, isSelected){
      if (!isOpen && isSelected){
        container.setRoundedBorder();
      } else {
        container.setNormalBorder();
      }
    },

    updateVisibility: function(isOpen, isSelected){
      if (isSelected || isOpen){
        container.show();
      } else {
        container.hide();
      }
    },

    updateOpacity: function(isOpen, isSelected){
      if (isSelected || isOpen){
        container.setOpaque();
      } else {
        container.setTransparent();
      }
    },

    updateHeight: function(isOpen, isSelected){
      if (isSelected || isOpen){
        container.setExpandedHeight();
      } else {
        container.setContractedHeight();
      }
    },
    animateExpand: async function(){
      await container.expandHeight();
    },
    animateContract: async function(){
      await container.contractHeight();
    },
    animateFadeIn: async function(){
      await container.fadeIn();
    },
    animateFadeOut: async function(){
      await container.fadeOut();
    },



    /*render: function(isSelected, isOpen){
      if (!isOpen && isSelected){
        container.setRoundedBorder();
      } else {
        container.setNormalBorder();
      }
      if (isSelected || isOpen){
        container.show();
        container.setExpandedHeight();
        container.setOpaque();
      } else {
        container.hide();
        container.setContractedHeight();
        container.setTransparent();
      }
    },*/
    setOpenStyle: function(){
      container.setNormalBorder();
      container.show();
      container.setExpandedHeight();
      container.setOpaque();
    },
    setClosedStyle: function(){
      if (state.isSelected.value === true){
        container.setRoundedBorder();
        container.show();
        container.setExpandedHeight();
        container.setOpaque();
      } else {
        container.setNormalBorder();
        container.hide();
        container.setContractedHeight();
        container.setTransparent();
      }
    },
    updateOnOpen: async function(){
      container.setNormalBorder();
      if (state.isSelected.value === true){
        await container.pause();
      } else {
        container.show();
        await container.expandHeight();
        await container.fadeIn();
      }
    },
    updateOnClose: async function(){
      if (state.isSelected.value === true){
        await container.pause();
      } else {
        await container.fadeOut();
        await container.contractHeight();
        container.hide();
      }
      container.setRoundedBorder();
    }
  }
};
