export function getNextAnimationFrame(){
  return new Promise ( resolve => {
    requestAnimationFrame( () => {
      resolve();
    });
  });
}

export default async function(duration, cycleFunction){
  var totalProgress = 0;
  var startTimeStamp = new Date().getTime();
  var prevTime = startTimeStamp;
  while (totalProgress < 1){
    //await getNextAnimationFrame();
    var currentTimeStamp = new Date().getTime();
    prevTime = currentTimeStamp;
    var currentRunTime = currentTimeStamp - startTimeStamp;
    totalProgress = currentRunTime / duration;
    totalProgress = Math.min(totalProgress, 1);
    await cycleFunction(totalProgress);
  }
}
