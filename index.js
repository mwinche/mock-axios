'use strict';

var BASE_URL_REGEX = /^[^\/]+:\/\/[^/]+/;

function delegate(instance, method, fn, hasData){
  instance[method] = hasData ?
    function(url, data, config){
      config = config || {};
      config.url = url;
      config.data = data;
      config.method = method;

      return fn(config);
    } :
    function(url, config){
      config = config || {};
      config.url = url;
      config.method = method;

      return fn(config);
    };

  return instance;
}

function merge(obj1, obj2){
  var obj = Object.keys(obj1).reduce(function(obj, key){
    obj[key] = obj1[key];

    return obj;
  }, {});

  return Object.keys(obj2).reduce(function(obj, key){
    obj[key] = obj2[key];

    return obj;
  }, obj);
}

function deepContained(obj1, obj2){
  if(obj1 === obj2){
    return true;
  }

  if(!obj1 || !obj2){
    return false;
  }

  //If its an array or an object want to compare keys, otherwise
  // straight equality should work
  if(!Object.keys(obj1).length && typeof obj1 !== 'object'){
    return obj1 === obj2;
  }
  else if(typeof obj1 === 'string'){
    return obj1 === obj2;
  }

  return Object.keys(obj1)
    .reduce(function(matches, key){
      return matches && deepContained(obj1[key], obj2[key]);
    }, true);
}

function conditionFactory(expectedConfig, result){
  expectedConfig = uniformConfig(expectedConfig);

  return function(actualConfig){
    actualConfig = uniformConfig(actualConfig);

    if(!deepContained(expectedConfig, actualConfig)){
      return undefined;
    }

    if(typeof result === 'function'){
      return result(actualConfig);
    }

    return result;
  };
}

function uniformConfig(config){
  var url = config.url;
  var baseURL = config.baseURL;
  var params = config.params;

  //If url is aboslute, this will extract the protocol and host until the '/'
  //character which separates it from the path (does not include the '/')
  var match = (BASE_URL_REGEX.exec(url) || [])[0];

  baseURL = match || baseURL;

  if(match){
    //Will contain the path including the leading '/'
    url = url.substr(match.length);
  }

  match = url.split('?')[1];

  if(match){
    url = url.substr(0, url.indexOf('?'));

    match = match.split('&');
    params = match.reduce(function(params, param){
      var parts = param.split('=');

      params[parts[0]] = parts[1];

      return params;
    }, params || {});
  }

  if(baseURL){
    baseURL = (BASE_URL_REGEX.exec(baseURL) || [])[0];
  }

  config.url = url;
  config.baseURL = baseURL;
  config.params = params;

  return config;
}

module.exports = (function(){
  var conditions = [];

  var api = {
    when: function(condition, data, config){
      if(typeof condition === 'function'){
        conditions.push(condition);
      }
      else{
        var config = config || {};
        config.data = data || config.data;
        config.url = condition;

        return {
          return: function(result){
            api.when(conditionFactory(config, result));

            return api;
          }
        };
      }

      return api;
    },
    axios: function(config){
      if(config.transformRequest){
        config.data = config.transformRequest.reduce(function(data, transform){
          return transform(data);
        }, config.data);
      }

      var result = conditions.reduce(function(result, conditionFN){
        return result || conditionFN(config);
      }, undefined);

      if(result === undefined){
        throw {
          message: "Request " + config.method + " " + config.url + " not handled",
          request: config
        };
      }

      if(config.transformResponse){
        result = config.transformResponse
          .reduce(function(result, transform){
            return transform(result);
          }, result);
      }

      //Reject it if we get an error status
      var promiseCast = (result && result.status && (result.status < 200 || result.status > 200)) ?
        Promise.reject : Promise.resolve;

      //Wrap it in a promise just to be sure. Promise API guarantees that if
      //`result` is a rejected promise, `Promise.resolve(result)` will reject
      //with the same value, likewise for resolved promises.
      return promiseCast(result);
    },
    reset: function(){
      conditions.length = 0;
    }
  };

  ['get', 'delete', 'head'].reduce(function(axios, method){
    return delegate(axios, method, axios, false);
  }, api.axios);

  ['get', 'delete', 'head'].reduce(function(when, method){
    when[method] = function(url, expectedConfig){
      expectedConfig = expectedConfig || {};
      expectedConfig.url = url;
      expectedConfig.method = method;

      return {
        return: function(result){
          when(conditionFactory(expectedConfig, result));
        }
      };
    };

    return when;
  }, api.when);

  ['post', 'put', 'patch'].reduce(function(axios, method){
    return delegate(axios, method, axios, true);
  }, api.axios);

  ['post', 'put', 'patch'].reduce(function(when, method){
    when[method] = function(url, data, expectedConfig){
      expectedConfig = expectedConfig || {};
      expectedConfig.url = url;
      expectedConfig.data = data || config.data;
      expectedConfig.method = method;

      return {
        return: function(result){
          when(conditionFactory(expectedConfig, result));
        }
      };
    };

    return when;
  }, api.when);

  api.axios.all = function all(promises) {
    return Promise.all(promises);
  };

  api.axios.spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  api.axios.create = function create(initialConfig){
    initialConfig = initialConfig || {};

    var instance = {
      request: function(config){
        return api.axios(merge(initialConfig, config));
      }
    };

    ['get', 'delete', 'head'].reduce(function(instance, method){
      return delegate(instance, method, instance.request, false);
    }, instance);

    ['post', 'put', 'patch'].reduce(function(instance, method){
      return delegate(instance, method, instance.request, true);
    }, instance);

    return instance;
  };

  return api;
})();
