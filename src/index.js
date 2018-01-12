export default class Base64Fetch {
  constructor(url) {
    this.url = url
  }
  async fetch(url = '', opts) {
    let _url = this.url || url
    let base64data = await _fetch(url, opts)
    let trim = base64data.split(',', 2)
    if (trim && trim[1]) {
      return trim[1]
    } else {
      return new Error('Result didnot return a base64 data object');
    }
  }
  async fetchAsData(url = '', opts) {
    let _url = this.url || url
    let base64data = await this._fetch(_url, opts, true);
    return base64data;
  }

  _fetch(url, opts = { mode: 'no-cors' }, keepAsData = true) {
    if (!url) {
      throw new Error('no url is provided')
    }
    return new Promise((resolve, reject) => {
      fetch(url, { mode: 'no-cors' }).then(function(response) {
          if (response.ok) {
            return response.blob()
          }
          throw new Error('bad response')
        }).then(function(myBlob) {

          var reader = new window.FileReader()
          reader.readAsDataURL(myBlob)
          reader.onloadend = function() {
            var base64data = reader.result
            resolve(base64data)
          }

        }).catch(reject)
    })
  }
}
