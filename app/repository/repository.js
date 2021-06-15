const URL = require('url').URL;
const qs = require('querystring');

class Repository {
  constructor(app, ctx) {
    this._app = app;
    this._ctx = ctx;
  }

  /**
   * 构建 repo
   * @public
   * @param {object} param
   * @param {Egg#context} ctx
   */
  build(param, ctx) {
    const repo = Object.create(this);
    repo.param = param;
    repo._ctx = ctx;
    return repo;
  }

  /**
   * 发送请求
   * @protected
   * @param {object} request
   */
  sendRequest(request) {
    const { url, options } = this.buildRequestData(request);
    return this._ctx.curl(url, options).then(res => res.data);
  }

  buildRequestData(data) {
    let url = this.getUrl(data.url, data.urlParams);
    const options = {
      contentType: data.contentType || 'json',
      dataType: data.dataType || 'json',
      method: data.method ? data.method : 'GET',
      data: data.data,
      headers: {
        ...data.headerData,
      },
    };

    const getQs = (sp, query) => {
      const q = sp.toString();
      let o = qs.parse(q);
      o = { ...o, ...query };
      return '?' + qs.stringify(o);
    };
    const urlObj = new URL(url);
    if (data.params) {
      urlObj.search = getQs(urlObj.searchParams, data.params);
    }
    url = urlObj.toString();

    return { url, options };
  }

  getUrl(url, params) {
    const URL_PARAM_REG = /\/(:\w+)/g;

    let formatUrl = url,
      prefix = '';

    if (params) {
      formatUrl = url.replace(URL_PARAM_REG, (match, key) => `/${params[key.replace(':', '')]}`);

      if (typeof params.prefix !== 'undefined') {
        prefix = params.prefix;
      }
    }
    return prefix + formatUrl;
  }
}

module.exports = Repository;
