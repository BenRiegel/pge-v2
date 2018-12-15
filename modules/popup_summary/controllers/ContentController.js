export default function NewContentController(state, view){

  //public api -----------------------------------------------------------------

  return {
    updateContent: async function(content){
      view.title.setContent(content.projectName);
      if (content.author){
        var authorText = `by ${content.author}, ${content.university} University, ${content.year}`;
      } else {
        var authorText = `written at ${content.university} University in ${content.year}`;
      }
      view.author.setContent(authorText);
      view.text.setContent(content.introText + ' . . . ');
      await view.image.load(content.introImageUrl);
      view.image.resize();
    },
  }

}
