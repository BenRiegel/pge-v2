export default function LoaderViewController(view, dispatcher){

  var { nodes } = view;
  var { root, animation } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(animation.node);

  //define event reactions -----------------------------------------------------

  var onShow = function(){
    animation.setVisibility('visible');
    root.setOpacity('1');
    root.setVisibility('visible');
  };

  var onHide = function(){
    animation.setVisibility('hidden');
    root.setOpacity('0');
    root.setVisibility('hidden');
  };

  var onFadeOutAndHide = async function(){
    animation.setVisibility('hidden');
    await root.transitionOpacity('0');
    root.setVisibility('hidden');
  };

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'show', onShow);
  dispatcher.setListener('view', 'hide', onHide);
  dispatcher.setListener('view', 'fadeOutAndHide', onFadeOutAndHide);

}
