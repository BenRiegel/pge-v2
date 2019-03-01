export default function LoaderController(state, view){

  var { nodes } = view;
  var { spinner, background } = nodes;

  //configure dom --------------------------------------------------------------

  background.node.appendChild(spinner.node);

  //define state change reactions ----------------------------------------------

  var updateSpinnerVisibility = function(){
    if (state.isActivated){
      spinner.props.visibility.set('visible');
    } else {
      spinner.props.visibility.set('hidden');
    }
  }

  var updateBackgroundVisibility = function(){
    if (state.isActivated){
      background.props.visibility.set('visible');
    } else {
      background.props.visibility.set('hidden');
    }
  }

  var updateBackgroundOpacity = function(){
    if (state.isActivated){
      background.props.opacity.set('1');
    } else {
      if (view.isFadingOut){
        return background.props.opacity.transition('0');
      } else {
        background.props.opacity.set('0');
      }
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isActivated', 'spinnerVisibility', updateSpinnerVisibility);
  state.addListenerByType('isActivated', 'backgroundOpacity', updateBackgroundOpacity);
  state.addListenerByType('isActivated', 'backgroundVisibility', updateBackgroundVisibility);

  //init -----------------------------------------------------------------------

  updateSpinnerVisibility();
  updateBackgroundOpacity();
  updateBackgroundVisibility();

}
