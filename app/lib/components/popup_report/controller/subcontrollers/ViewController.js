export default function PopupReportViewController(view, dispatcher, model, popupModel){

  var { nodes, subcomponents } = view;
  var { root, content, closeButton, contractButton, iframe } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
  content.appendChildNode(contractButton.node);
  content.appendChildNode(iframe.node);

  //define state change reactions ----------------------------------------------

  var loadContent = async function(){
    if (model.props.content.hasChanged){
      loader.show();
      await iframe.setSrc(model.content.url);
      loader.hide();
    }
  }

  var onFadeInAndShow = async function(){
    root.setVisibility('visible');
    await loadContent();
    await content.transitionOpacity('1');
  }

  var onHide = function(){
    content.setOpacity('0');
    root.setVisibility('hidden');
  }

  var onFadeOutAndHide = async function(){
    await content.transitionOpacity('0');
    root.setVisibility('hidden');
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'fadeInAndShow', onFadeInAndShow);
  dispatcher.setListener('view', 'hide', onHide);
  dispatcher.setListener('view', 'fadeOutAndHide', onFadeOutAndHide);

}
