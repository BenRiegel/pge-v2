export default function PopupReportViewController(view, popupModel){

  var { nodes, subcomponents } = view;
  var { root, content, iframe } = nodes;
  var { loader, closeButton, contractButton } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.rootNode);
  content.appendChildNode(contractButton.rootNode);
  content.appendChildNode(iframe.node);

  //define state change reactions ----------------------------------------------

  var loadContent = async function(){
    if (!view.state.contentHasLoaded){
      loader.show();
      await iframe.setSrc(popupModel.content.url);
      loader.hide();
      view.state.set('contentHasLoaded', true);
    }
  }

  var resetContentHasLoaded = function(){
    view.state.set('contentHasLoaded', false);
  }

  //load state change reactions ------------------------------------------------

  popupModel.addListener('content', resetContentHasLoaded);

  //public api -----------------------------------------------------------------

  this.show = async function(){
    root.setVisibility('visible');
    await loadContent();
    await content.transitionOpacity('1');
  }

  this.hide = function(){
    content.setOpacity('0');
    root.setVisibility('hidden');
  }

  this.fadeOutAndHide = async function(){
    await content.transitionOpacity('0');
    root.setVisibility('hidden');
  }

}
