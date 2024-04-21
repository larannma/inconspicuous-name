import {encoded, translations} from './data.js'

const keysNotInclude = [
  'groupId',
  'service',
  'formatSize',
  'ca'
]

const searchSuffix = "Id"

console.log("Let's rock")


/**
 * Changes values of keys which has been founs in _translations_
 * @param {*} obj 
 */
function changeObject(obj, translations){
  let newObj = {}
  for (let [key, value] of Object.entries(obj)) {
    if (key.endsWith(searchSuffix) && !keysNotInclude.includes(key)){
      if (value in translations){
        newObj[key] = translations[value]
      }
    } else {
      newObj[key] = value
    }
  }
  return newObj;
}

/**
 * Collects uniq Id from all abjects of an Array
 * @param {Array} arr 
 * @returns 
 */

export const findUniq = (arr) => {
  let res = [];
  arr.forEach((value) => {
    for (let key of Object.keys(value)) {
      if (!res.includes(key) && key.endsWith(searchSuffix)){
        res.push(key)
      }
    }
  })
  
  return res;
}

/**
 * 
 * @param {*} encoded object with encoded values
 * @param {*} translations translations to certain values
 * @returns new object with decoded values
 */
export const decode = (encoded, translations) => {
  let decoded = [];

  encoded.forEach((value) => {
    decoded.push(changeObject(value, translations));
  })
  return decoded
}

console.log(decode(encoded, translations));
console.log(findUniq(encoded));