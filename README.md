# fetch-base64-in-browser
`fetch-base64-in-browser` fetches binary files on the web and converts them to either a Base64 string or a [data uri](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) (which is a base64 string with some prefixed data)

my original intent was to be able to catch short mp3 clips into localstorage since ios safari doesn't seem to cache audio directly.

## why not just use btoa() and atob()?
those functions only convert strings into base64

# install
```
npm install fetch-base64-in-browser
```

# examples
```html
<html>
  <head>
  <script src="../lib/fetch-base64.js"></script>
  <script>
  'use strict';

  document.addEventListener('DOMContentLoaded', function(event) {
    let b64f = new FetchBase64('./spongebob.png');
    b64f.fetchAsData().then((base64) => {
      console.log('spongebob.png is b64', base64);
      document.getElementById('spongebob').src = base64;
    }).catch((err) => {
      console.error(err);
    })
  })
  </script>
  </head>
  <body>
    <img id="spongebob" />
  </body>
</html>
```
# browser support
your browser needs to support
* fetch
* FileReader/File API
* async/await (you could transpile this using babel)

browsers that match this criteria
* chrome: 61+
* safari: 10.1+
* firefox: 57+
* ios: 10.3+
* edge: 15+

ie is not supported at all.

# shimming fetch/filereader
the constructor allows for you to pass shims for fetch and FileReader, thus theoretically making this work for node.js as well.

the two npm libraries used to test for this were:
* `node-fetch` for fetch api
* `@swang/filereader` for the filereader api (i am using this fork because the original one is not kept up to date and more work needed to be done to support blobs)

# documentation

## constructor(url, opts)
create a new instance of the class

url (string): the url that you want to fetch
opts (object): you pass a shims object that contains the fetch and filereader shims you want to use instead of the browsers apis (or node's lack of apis)

### example:
```js
const fileReader = require('@swang/filereader')
const fetch = require('node-fetch')
const FetchBase64 = require('fetch-base64-in-browser')

const url = 'https://raw.githubusercontent.com/github/explore/fd96fceccf8c42c99cbe29cf0f8dcc4736fcb85a/topics/nodejs/nodejs.png'

let shims = {
  fetch,
  fileReader
}

let b64f = new FetchBase64(url, { shims })
b64.fetchAsData().then((base64) => console.log(base64))

```

## fetch(url, opts)
fetches a url and returns its base64 value

url(string): the url you want to convert to its base64 value
opts(object): this passes the same parameters as a normal fetch would.

see [https://developers.google.com/web/updates/2015/03/introduction-to-fetch](google's intro to fetch) for a small list of available options

## fetchAsDataUrl(url, opts)
same as `fetch`, but returns a data uri

# license
isc

# author
shuan wang (shuanwang@gmail.com)
