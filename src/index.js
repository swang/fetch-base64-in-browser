'use strict';

// your browser needs support for:
// fetch
// async/await functions
// FileReader capabilities

export default class Base64Fetch {
  constructor(url) {
    this.url = url
  }
  async fetch(url = '', opts) {
    let _url = this.url || url
    try {
      let base64data = await this._fetch(url, opts)
    } catch (e) {
      throw new Error(e)
    }

    let trim = base64data.split(',', 2)
    if (trim && trim[1]) {
      return trim[1]
    } else {
      return new Error('Result did not return a base64 data object');
    }
  }
  async fetchAsData(url = '', opts) {
    let _url = this.url || url
    let base64data = await this._fetch(_url, opts, true);
    return base64data;
  }

  async _fetch(url, opts = { mode: 'no-cors' }, keepAsData = true) {
    if (!url) {
      throw new Error('no url is provided')
    }
    let response = await fetch(url, { mode: 'no-cors' })
    if (response.ok) {
      let reader = new window.FileReader()
      let blob = await response.blob()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        let base64data = reader.result
        return base64data
      }
    } else {
      throw new Error(response.status)
    }
  }
}
