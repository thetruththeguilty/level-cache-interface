
const levelup = require('levelup')
const leveldown = require('leveldown')
const { createLevelCache } = require('../index')

// 1) Create our database, supply location and options.
//    This will create or open the underlying store.
// var db = levelup(leveldown('level-db'))
 
// // 2) Put a key & value
// db.put('name', 'Level', function (err: any) {
//   if (err) return console.log('Ooops!', err) // some kind of I/O error
 
//   // 3) Fetch by key
//   db.get('name', function (err: any, value: any) {
//     if (err) return console.log('Ooops!', err) // likely the key was not found
 
//     // Ta da!
//     console.log('name=' + value)
//   })
// })

// let dbCache = createLevelCache(db)
// dbCache.save('name', 'level cache')
//   .then(() => {
//     return dbCache.load('name', 10)
//   })
//   .then(ret => {
//     console.log('name=' + ret)
//   })

let db = levelup(leveldown('level-db'))
let dbCache = createLevelCache(db)

function sleep(n) {
  return new Promise(resolve => setTimeout(resolve, n))
}

test('save and load', async () => {
  // expect(1).toBe(1)
  let ret = await dbCache.save('name', 'level cache')
    .then(() => {
      return dbCache.load('name', 10)
    })
    .then(ret => {
      // console.log('name=' + ret)
      return ret
    })
  expect(ret).toBe('level cache')

  let noValue = await dbCache.save('test', 'foo', 1)
    .then(() => {
      return sleep(2 * dbCache.timeDivider())
    })
    .then(() => {
      return dbCache.load('test', 1)
    })
  
  expect(noValue).toBeUndefined()
})