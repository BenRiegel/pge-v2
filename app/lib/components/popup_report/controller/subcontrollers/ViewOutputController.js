export default function PopupReportViewOutputController(view, dispatcher, popupModel){

  var { nodes, subcomponents } = view;
  var { root, content, closeButton, contractButton, iframe } = nodes;
  var { loader } = subcomponents;

  //define state change reactions ----------------------------------------------

  var updateContent = async function(){
    if (!view.state.contentHasLoaded){
      loader.activate();
      await iframe.setSrc(popupModel.content.url);
      loader.terminate(false);
    }
  }

  var updatePosition = function(dimensions, isTransitioning){
    var p1 = root.setStyle('left', `${dimensions.left}px`, isTransitioning);
    var p2 = root.setStyle('top', `${dimensions.top}px`, isTransitioning);
    var p3 = root.setStyle('width', `${dimensions.width}px`, isTransitioning);
    var p4 = root.setStyle('height', `${dimensions.height}px`, isTransitioning);
    if (isTransitioning){
      return Promise.all( [p1, p2, p3, p4] );
    }
  }

  var onPosition = function(dimensions){
    updatePosition(dimensions, false);
  }

  var onOpen = async function(expandedDimensions){
    root.setVisibility('visible');
    await updatePosition(expandedDimensions, true);
    await updateContent();
    await content.setOpacity('1', true);
  }

  var onContract = async function(contractedDimensions){
    await content.setOpacity('0', true);
    await updatePosition(contractedDimensions, true);
    root.setVisibility('hidden');
  };

  var onContractAndClose = function(){
    content.setOpacity('0');
    root.setVisibility('hidden');
  };

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('viewOutput', 'open', onOpen);
  dispatcher.setListener('viewOutput', 'position', onPosition);
  dispatcher.setListener('viewOutput', 'updateOnContract', onContract);
  dispatcher.setListener('viewOutput', 'contractAndClose', onContractAndClose)

  //init -----------------------------------------------------------------------

  root.setVisibility('hidden');
  content.setOpacity('0');

}
