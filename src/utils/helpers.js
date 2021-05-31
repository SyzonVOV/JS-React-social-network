export function checkObjHasTrueValues(obj) {
  return Object.values(obj).some(Boolean);
}

export function objIterationWithReplacement(object, lookFor, changeWith) {
  const result = {};
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      if (object[property] === lookFor) {
        result[property] = changeWith;
      } else if (typeof object[property] === 'object') {
        result[property] = objIterationWithReplacement(object[property], lookFor, changeWith)
      }else {
        result[property] = object[property];
      }
    }
  }
  return result;
}