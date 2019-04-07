//imports ----------------------------------------------------------------------

import { doForAll, doForAllAsync } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuViewOutputController(view, model){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { options } = subcomponents;

  //helper functions -----------------------------------------------------------

  var updateRootBorderRadius = function(){
    if (model.isOpen){
      root.setBorderRadius('default');
    } else {
      root.setBorderRadius('rounded');
    }
  };

  //init view props ------------------------------------------------------------

  updateRootBorderRadius();

  //public api -----------------------------------------------------------------

  this.renderOption = function(option){
    option.updateView('iconVisibility');
    option.updateView('iconChar', model.isOpen);
    option.updateView('iconBorderVisibility', model.isOpen);
    option.updateView('rootBorderRadius', model.isOpen);
    option.updateView('rootVisibility', model.isOpen);
    option.updateView('rootHeight', model.isOpen, false);
    option.updateView('rootOpacity', model.isOpen, false);
  };

  this.updateOnOptionSelect = function(){
    if (model.props.selectedOptionKey.hasChanged){
      doForAll(options, 'updateModel', model.selectedOptionKey, model.isOpen);
    }
  };

  this.updateOnIsOpenChange = async function(){
    if (model.isOpen){
      updateRootBorderRadius();
      doForAll(options, 'updateView', 'iconChar', model.isOpen);
      doForAll(options, 'updateView', 'iconBorderVisibility', model.isOpen);
      doForAll(options, 'updateView', 'rootBorderRadius', model.isOpen);
      doForAll(options, 'updateView', 'rootVisibility', model.isOpen);
      await doForAllAsync(options, 'updateView', 'rootHeight', model.isOpen);
      await doForAllAsync(options, 'updateView', 'rootOpacity', model.isOpen);
    } else {
      await doForAllAsync(options, 'updateView', 'rootOpacity', model.isOpen);
      await doForAllAsync(options, 'updateView', 'rootHeight', model.isOpen);
      doForAll(options, 'updateView', 'rootVisibility', model.isOpen);
      doForAll(options, 'updateView', 'rootBorderRadius', model.isOpen);
      doForAll(options, 'updateView', 'iconBorderVisibility', model.isOpen);
      doForAll(options, 'updateView', 'iconChar', model.isOpen);
      updateRootBorderRadius();
    }
  };

}
