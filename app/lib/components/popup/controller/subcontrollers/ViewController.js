export default function PopupViewController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root, popup, arrow, content } = nodes;
  var { summary, report } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(summary.rootNode);
  root.appendChildNode(report.rootNode);

  //define view reactions ------------------------------------------------------

  var getExpandedDimensions = function(){
    var rootDimensions = root.getDimensions();
    return {
      top: 0,
      left: 0,
      width: rootDimensions.width,
      height: rootDimensions.height,
    }
  }

  //define event reactions -----------------------------------------------------

  var onSetContent = function(){
    if (model.props.content.hasChanged){
      summary.update('resetLoadingStatus');
      report.update('resetLoadingStatus');
    }
  }

  var onOpen = async function(){
    summary.update('rootVisibility');
    await summary.loadContent();
    await summary.updateAsync('contentHeight');
    await summary.updateAsync('contentOpacity');
  }

  var onClose = function(){
    summary.update('rootVisibility');
    summary.update('contentHeight');
    summary.update('contentOpacity');
  }

  var onExpand = async function(){
    await summary.updateAsync('contentOpacity');
    summary.update('arrowVisibility');
    var summaryDimensions = summary.getDimensions();
    report.update('position', summaryDimensions, false);
    report.update('rootVisibility');
    var expandedDimensions = getExpandedDimensions();
    await report.updateAsync('position', expandedDimensions, true);
    await report.loadContent();
    await report.updateAsync('contentOpacity');
  }

  var onContract = async function(){
    await report.updateAsync('contentOpacity');
    var summaryDimensions = summary.getDimensions();
    await report.updateAsync('position', summaryDimensions, true);
    report.update('rootVisibility');
    summary.update('arrowVisibility');
    await summary.updateAsync('contentOpacity');
  }

  var onContractAndClose = function(){
    summary.update('rootVisibility');
    summary.update('contentHeight');
    summary.update('contentOpacity');
    summary.update('arrowVisibility');
    report.update('contentOpacity');
    report.update('rootVisibility');
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'setContent', onSetContent);
  dispatcher.setListener('view', 'open', onOpen);
  dispatcher.setListener('view', 'close', onClose);
  dispatcher.setListener('view', 'contract', onContract);
  dispatcher.setListener('view', 'expand', onExpand);
  dispatcher.setListener('view', 'contractAndClose', onContractAndClose);
  dispatcher.setListener('view', 'forceClose', onClose);

}
