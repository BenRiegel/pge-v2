export default function LoaderViewOutputController(view){

  var { nodes } = view;
  var { root, animation } = nodes;

  //helper functions -----------------------------------------------------------

  var fadeOutAndHide = async function(){
    animation.setStyle('visibility', 'hidden');
    await root.setStyle('opacity', '0', true);
    root.setStyle('visibility', 'hidden');
    root.setStyle('opacity', '1');
    animation.setStyle('visibility', '');
  }

  //public api -----------------------------------------------------------------

  this.show = function(){
    root.setStyle('visibility', 'visible');
  }

  this.hide = function(fadeOut){
    if (fadeOut){
      return fadeOutAndHide();
    } else {
      root.setStyle('visibility', 'hidden');
    }
  }

}
