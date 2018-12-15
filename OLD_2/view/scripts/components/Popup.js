//imports ----------------------------------------------------------------------

import State from '../lib/State.js';
import { getProjectData } from '../../../services/Firebase.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import NewPopupSummary from './PopupSummary.js';
import NewPopupReport from './PopupReport.js';
import NodeInstance from '../lib/NodeInstance.js';
import '../../stylesheets/popup_container.scss';


//exports ----------------------------------------------------------------------

export default function NewPopup(closeAction, expandAction, contractAction){

  // state ---------------------------------------------------------------------

  var state = new State('isExpanded', 'isOpen', 'projectId');

  // view ----------------------------------------------------------------------

  var popupSummary = NewPopupSummary(closeAction, expandAction);
  var popupReport = NewPopupReport(closeAction, contractAction);
  var container = new NodeInstance('div');
  container.className = 'popup-container';
  addChildrenTo(container, [popupSummary, popupReport]);

  //controller -----------------------------------------------------------------

  state.isOpen.onChange = async function(isOpen){
    popupSummary.onIsOpenChange(isOpen);
  };

  state.projectId.onChange = async function(projectId){
    popupSummary.startLoading();
    popupReport.startLoading();
    var contentPromise = getProjectData(projectId);
    var snapshot = await contentPromise;
    var content = snapshot.val();
    await popupSummary.updateContent(content);
    await popupReport.updateContent(content);
  };

  state.isExpanded.onChange = async function(currentValue, previousValue){
    var isAnimating = (previousValue !== undefined);
    if (currentValue === true){
      await popupSummary.onIsExpandedChange(currentValue, isAnimating);
      await popupReport.onIsExpandedChange(currentValue, isAnimating);
    } else {
      await popupReport.onIsExpandedChange(currentValue, isAnimating && state.isOpen.value === true);
      await popupSummary.onIsExpandedChange(currentValue, isAnimating && state.isOpen.value === true);
    }
  };

  // public api ----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    setContent: async function(newProjectId){
      await state.projectId.set(newProjectId);
    },
    open: async function(){
      await state.isOpen.set(true);
    },
    close: async function(){
      await state.isOpen.set(false);
      await state.isExpanded.set(false);
    },
    expand: async function(){
      await state.isExpanded.set(true);
    },
    contract: async function(){
      await state.isExpanded.set(false);
    }
  }

}
