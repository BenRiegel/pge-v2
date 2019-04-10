export default function PopupTemplateEmitterController(emitter, view){

  var { nodes } = view;
  var { readMore } = nodes;

  //load event listeners -------------------------------------------------------

  readMore.setEventListener('click', () => {
    emitter.notify('readMoreRequest');
  });

}
