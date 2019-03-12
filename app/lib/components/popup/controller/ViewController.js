export default function PopupViewController(view, state){

  var { nodes, subcomponents } = view;
  var { root, arrow, arrowCover } = nodes;
  var { summary, report } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(arrow.node);
  root.appendChildNode(arrowCover.node);
  arrowCover.appendChildNode(summary.rootNode);
  arrowCover.appendChildNode(report.rootNode);

  //define state change reactions ----------------------------------------------

  var updateRootVisibility = function(){
    if (state.isOpen){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateRootHeight = function(){
    if (state.isOpen){
      root.setHeight('offset');
    } else {
      root.setHeight('auto');
    }
  }

  var updateRootDimensions = function(){
    if (state.isOpen){
      if (state.isExpanded){
        return root.transitionDimensions('expanded');
      } else {
        return root.transitionDimensions('contracted');
      }
    } else {
      root.setDimensions('contracted');
    }
  }

  var updateRootZIndex = function(){
    if (state.isExpanded){
      root.setZIndex('expanded');
    } else {
      root.setZIndex('contracted');
    }
  }

  var updateArrowVisibility = function(){
    if (state.isOpen && !state.isExpanded){
      arrow.setVisibility('visible');
    } else {
      arrow.setVisibility('hidden');
    }
  }

  //load state change reactions ------------------------------------------------

  state.addListenerByType('isOpen', 'rootVisibility', updateRootVisibility);
  state.addListenerByType('isOpen', 'arrowVisibility', updateArrowVisibility);
  state.addListenerByType('isOpen', 'rootHeight', updateRootHeight);
  state.addListenerByType('isExpanded', 'rootDimensions', updateRootDimensions);
  state.addListenerByType('isExpanded', 'arrowVisibility', updateArrowVisibility);
  state.addListenerByType('isExpanded', 'rootZIndex', updateRootZIndex);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateRootHeight();
  updateRootZIndex();
  updateArrowVisibility();
  updateRootDimensions();

  //public api -----------------------------------------------------------------

  this.enableSubcomponents = function(){
    view.subcomponents.summary.enable();
    view.subcomponents.report.enable();
  };

  this.disableSubcomponents = function(){
    view.subcomponents.summary.disable();
    view.subcomponents.report.disable();
  };

}
