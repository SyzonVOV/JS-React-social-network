export function checkObjHasTrueValues(obj) {
  return Object.values(obj).some(Boolean)
}