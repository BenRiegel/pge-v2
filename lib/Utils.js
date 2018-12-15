export function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}

export async function wait(time){
  await new Promise( resolve => {
    setTimeout(resolve, time);
  });
}

export async function waitAtLeast(minTime, p){
  await Promise.all( [wait(minTime), p] );
  /*var startTimeStamp = new Date().getTime();
  await p;
  var endTimeStamp = new Date().getTime();
  var timeElapsed = endTimeStamp - startTimeStamp;
  var timeRemainding = minTime - timeElapsed;
  if (timeRemainding > 0){
    await wait(timeRemainding);
  }*/
}
