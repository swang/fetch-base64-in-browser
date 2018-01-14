'use strict';

// your browser needs support for:
// fetch
// async/await functions
// FileReader capabilities

export default class FetchBase64 {
  constructor(url, opts = { shims: { fetch: undefined, fileReader: undefined } }) {
    this.url = url
    this.fetchFn = opts.shims.fetch || (typeof window !== 'undefined' && window.fetch.bind(window))
    if (!this.fetchFn) {
      throw new Error('Unable to find fetch in browser or as a passed shim')
    }

    this.fileReaderFn = opts.shims.fileReader || (typeof window !== 'undefined' && window.FileReader.bind(window))
    if (!this.fileReaderFn) {
      throw new Error('Unable to find FileReader in browser or as a passed shim')
    }
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

  async _fetch(url, opts, keepAsData = true) {
    if (!url) {
      throw new Error('no url is provided')
    }

    let response = await this.fetchFn(url, opts)

    if (response.ok) {
      let reader = new this.fileReaderFn()
      let blob = await response.blob()
      reader.readAsDataURL(blob)

      return new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
          let base64data = reader.result
          resolve(base64data)
        }, { once: true })
        reader.addEventListener('error', (error) => {
          reject(error)
        }, { once: true })
      })
    } else {
      throw new Error(response.status)
    }
  }
}
if (typeof module !== 'undefined') {
  module.exports = FetchBase64
}

