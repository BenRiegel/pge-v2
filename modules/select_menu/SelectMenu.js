//imports ----------------------------------------------------------------------

import ObservedVar from '../../lib/ObservedVar.js';
import IsOpenProp from './models/IsOpenProp.js';
import NewContainerView from './views/ContainerView.js';
import NewOptionContainerView from './views/OptionContainerView.js';
import NewIconContainerView from './views/IconContainerView.js';
import NewIconView from './views/IconView.js';
import NewLabelContainerView from './views/LabelContainerView.js';
import NewLabelNameView from './views/LabelNameView.js';
import NewLabelCountView from './views/LabelCountView.js';
import NewDomController from './controllers/DomController.js';
import NewContainerController from './controllers/ContainerController.js';
import NewEventsController from './controllers/EventsController.js';
import NewOptionsController from './controllers/OptionsController.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenu(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
    isOpen: new IsOpenProp(),
    selectedOptionKey: new ObservedVar(),
  }

  var view = {
    container: NewContainerView(),
    options: {},
  }

  var controller = {
    dom: NewDomController(view.container),
    events: NewEventsController(state, view.container),
    container: NewContainerController(state, view.container),
    options: NewOptionsController(state, view.options),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.node,
    addListener: controller.events.addListener,
    addNewOption: function( {key, name, count, labelIsIndented} ){
      var option = {
        container: NewOptionContainerView(key),
        iconContainer: NewIconContainerView(),
        icon: NewIconView(),
        labelContainer: NewLabelContainerView(labelIsIndented),
        labelCount: NewLabelCountView(count),
        labelName: NewLabelNameView(name),
      }
      view.options[key] = option;
      controller.dom.addOption(option);
    },
    enable: function(){
      state.isEnabled = true;
    },
    disable: function(){
      state.isEnabled = false;
    },
    close: async function(){
      await state.isOpen.set(false);
    },
    setSelectedOption: async function(newOptionKey){
      state.selectedOptionKey.set(newOptionKey);
    }
  };
}
