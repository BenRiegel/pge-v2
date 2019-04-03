export default function PopupViewOutputController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root, popup, arrow, content } = nodes;
  var { summary, report } = subcomponents;

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
      summary.do('resetLoadingStatus');
      report.do('resetLoadingStatus');
    }
  }

  var onOpen = function(){
    return summary.do('open');
  }

  var onClose = function(){
    summary.do('close');
  }

  var onExpand = async function(){
    var summaryDimensions = summary.do('getDimensions');
    report.do('position', summaryDimensions);
    await summary.do('updateOnExpand');
    var expandedDimensions = getExpandedDimensions();
    await report.do('open', expandedDimensions);
  }

  var onContract = async function(){
    var summaryDimensions = summary.do('getDimensions');
    await report.do('updateOnContract', summaryDimensions);
    await summary.do('updateOnContract');
  }

  var onContractAndClose = function(){
    summary.do('contractAndClose');
    report.do('contractAndClose');
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('viewOutput', 'setContent', onSetContent);
  dispatcher.setListener('viewOutput', 'open', onOpen);
  dispatcher.setListener('viewOutput', 'close', onClose);
  dispatcher.setListener('viewOutput', 'contract', onContract);
  dispatcher.setListener('viewOutput', 'expand', onExpand);
  dispatcher.setListener('viewOutput', 'contractAndClose', onContractAndClose);
  dispatcher.setListener('viewOutput', 'forceClose', onClose);

}
