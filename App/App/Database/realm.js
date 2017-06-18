import Realm from 'realm'

let realm

export const init = () => {
  realm = new Realm({
    schema: [{name: 'AdverseReaction', properties: {
      type: 'string',
      intensity: 'int'
    }}]
  })
}

export const writeAdverseReaction = (type, intensity) => {
  realm.write(() => {
    realm.create('AdverseReaction', {type, intensity});
  })
}

export const getAllOfType = (type) => {
  return realm.objects('AdverseReaction').filtered(`type == ${type}`)
}

// console.log(data.length, 'opbnjects in db')
// console.log(data[0].intensity, data[0].type, 'opbnjects in db')