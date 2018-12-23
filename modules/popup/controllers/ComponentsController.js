export default function NewComponentsController(state, view){

  state.expandedState.addListener('components', 'updateOnChange', async (currentState, previousState) => {
    if (currentState === 'closed'){
      view.report.close();
      view.summary.close();
      view.summary.setContracted();
    }
    if (currentState === 'open-contracted' && previousState === 'closed'){
      view.summary.open();
      await view.summary.waitIfContentLoading();
      await view.summary.expandContentHeight();
      await view.summary.fadeInContent();
    }
    if (currentState === 'open-contracted' && previousState === 'open-expanded'){
      await view.report.fadeOutContent();
      view.report.close();
      await view.summary.animateContract();
      await view.summary.fadeInContent();
    }
    if (currentState === 'open-expanded' && previousState === 'open-contracted'){
      await view.summary.fadeOutContent();
      var containerDimensions = view.container.getDimensions();
      await view.summary.animateExpand(containerDimensions);
      view.report.open();
      await view.report.waitIfContentLoading();
      await view.report.fadeInContent();
    }
  });

  state.projectData.addListener('components', 'updateOnChange', projectData => {
    view.summary.loadNewProjectData(projectData);
    view.report.setProjectUrl(projectData.url);
  });

}


/*if (currentState === 'closed' && previousState === 'open-contracted'){
  view.summary.close();
}
if (currentState === 'closed' && previousState === 'open-expanded'){
  view.report.close();
  view.summary.close();
  view.summary.setContracted();
}*/
