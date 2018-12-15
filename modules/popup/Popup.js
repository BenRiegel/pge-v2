//imports ----------------------------------------------------------------------

import ObservedVar from '../../lib/ObservedVar.js';
import NewContainerView from './views/ContainerView.js';
import NewPopupSummary from '../popup_summary/PopupSummary.js';
import NewPopupReport from '../popup_report/PopupReport.js';
import NewEventsController from './controllers/EventsController.js';
import NewComponentsController from './controllers/ComponentsController.js';
import NewDomController from './controllers/DomController.js';


//exports ----------------------------------------------------------------------

export default function NewPopup(){

  //private code block ---------------------------------------------------------

  var state = {
    expandedState: new ObservedVar(),
    projectData: new ObservedVar(),
  }

  var view = {
    container: NewContainerView(),
    summary: NewPopupSummary(),
    report: NewPopupReport(),
  }

  var controller = {
    dom: NewDomController(view),
    components: NewComponentsController(state, view),
    events: NewEventsController(state, view),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.node,
    addListener: controller.events.addListener,
    enable: function(){
      view.summary.enable();
      view.report.enable();
    },
    disable: function(){
      view.summary.disable();
      view.report.disable();
    },
    setContent: function(projectData){
      state.projectData.set(projectData);
    },
    open: async function(){
      await state.expandedState.set('open-contracted');
    },
    close: async function(){
      state.expandedState.set('closed');
    },
  }
}
