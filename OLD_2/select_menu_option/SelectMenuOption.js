//imports ----------------------------------------------------------------------

import StateProp from '../../lib/State.js';
import NewContainer from './views/OptionContainerView.js';
import NewIconContainerView from './views/IconContainerView.js';
import NewIconView from './views/IconView.js';
import NewLabelContainerView from './views/LabelContainerView.js';
import NewLabelNameView from './views/LabelNameView.js';
import NewLabelCountView from './views/LabelCountView.js';
import NewDomController from './controllers/DomController.js';
import NewContainerController from './controllers/ContainerController.js';
import NewIconContainerController from './controllers/IconContainerController.js';
import NewIconController from './controllers/IconController.js';
import NewLabelContainerController from './controllers/LabelContainerController.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOption({key, name, count, type}){

  //private code block ---------------------------------------------------------

  var state = {
    isSelected: new StateProp(),
  }

  var view = {
    container: NewContainer(key),
    iconContainer: NewIconContainerView(),
    icon: NewIconView(),
    labelContainer: NewLabelContainerView(),
    labelName: NewLabelNameView(name),
    labelCount: NewLabelCountView(count),
  };

  var controller = {
    dom: NewDomController(view),
    container: NewContainerController(state, view.container),
    iconContainer: NewIconContainerController(state, view.iconContainer),
    icon: NewIconController(state, view.icon),
    labelContainer: NewLabelContainerController(state, view.labelContainer, type),
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.rootNode,
    render: function(isOpen, isSelected){
      controller.iconContainer.updateBorder(isOpen);
      controller.icon.updateChar(isOpen);
      controller.icon.updateVisibility(isSelected);
      controller.labelContainer.updateIndent(isOpen);
      controller.container.updateBorder(isOpen, isSelected);
      controller.container.updateVisibility(isOpen, isSelected);
      controller.container.updateHeight(isOpen, isSelected);
      controller.container.updateOpacity(isOpen, isSelected);
    },
    updateOnSelect(){
      controller.icon.updateVisibility(true);
      controller.container.updateBorder(null, true);
      controller.container.updateVisibility(null, true);
      controller.container.updateHeight(null, true);
      controller.container.updateOpacity(null, true);
    },
    updateOnUnselect(){
      controller.icon.updateVisibility(false);
      controller.container.updateBorder(null, false);
      controller.container.updateVisibility(null, false);
      controller.container.updateHeight(null, false);
      controller.container.updateOpacity(null, false);
    },
    updateIconBorder: controller.iconContainer.updateBorder,
    updateIconChar: controller.icon.updateChar,
    updateLabelIndent: controller.labelContainer.updateIndent,
    updateContainerBorder: controller.container.updateBorder,
    async animateOpening(){
      await controller.container.animateExpand();
      await controller.container.fadeIn();
    },
    async animateClosing(){
      await controller.container.fadeOut();
      await controller.container.animateContract();
    },





  /*  select: function(){
      state.isSelected.set(true);
    },
    unselect: function(){
      state.isSelected.set(false);
    },
    setOpenStyle: function(){
      controller.iconContainer.updateBorder(true);
      controller.icon.updateChar(true);
      controller.labelContainer.updateOnOpen();
      controller.container.setOpenStyle();
    },
    setClosedStyle: function(){
      controller.container.setClosedStyle();
      controller.labelContainer.updateOnClose();
      controller.icon.updateChar(false);
//      controller.iconContainer.updateOnClose();
      controller.iconContainer.updateBorder(false);
    },
    updateOnOpen: async function(){
      controller.iconContainer.updateBorder(true);
      controller.icon.updateChar(true);
      controller.labelContainer.updateOnOpen();
      await controller.container.updateOnOpen();
    },
    updateOnClose: async function(){
      await controller.container.updateOnClose();
      controller.labelContainer.updateOnClose();
      controller.icon.updateChar(false);
      controller.iconContainer.updateBorder(false);
    },*/

  }
}
