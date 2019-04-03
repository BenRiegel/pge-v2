export default function LoaderViewOutputController(view, dispatcher){

  var { nodes } = view;
  var { root, animation } = nodes;

  //define event reactions -----------------------------------------------------

  var onShow = function(){
    root.setStyle('visibility', 'visible');
  }

  var fadeOutAndHide = async function(){
    animation.setStyle('visibility', 'hidden');
    await root.setStyle('opacity', '0', true);
    root.setStyle('visibility', 'hidden');
    root.setStyle('opacity', '1');
    animation.setStyle('visibility', '');
  }

  var onHide = function( {fadeOut} ){
    if (fadeOut){
      return fadeOutAndHide();
    } else {
      root.setStyle('visibility', 'hidden');
    }
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('viewOutput', 'show', onShow);
  dispatcher.setListener('viewOutput', 'hide', onHide);

  //init -----------------------------------------------------------------------

  //put in css?
  root.setVisibility('hidden');

}
