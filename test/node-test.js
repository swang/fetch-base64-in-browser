'use strict';

// need to run a local http server and have a path to the /test/ folder
const fileReader = require('@swang/filereader')
const fetch = require('node-fetch')
const assert = require ('assert')
const fetchBase64 = require('../lib/fetch-base64.js')

const b64expected = 'data:image/png; charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAApoAAAQACAYAAABBIfngAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAd'
const url = 'http://localhost:8080/test/spongebob.png'

let shims = {
  fetch,
  fileReader
}

let b64f = new fetchBase64(url, { shims })

b64f.fetchAsData().then((base64) => {
  assert.equal(base64.substring(0, b64expected.length), b64expected)
  console.log('Test Passed')
}).catch((err) => {
  console.error(err)
  console.log('Test Failed')
})

