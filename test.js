var moxios = require('./index.js');

function verifyNotRejected(promise, done){
  promise.catch(function(err){
    expect(err).not.toBeDefined();
    expect('This should not happen').not.toBeDefined();
    done();
  });
}

describe('moxios', function(){
  var mock;

  beforeEach(function(){
    mock = moxios();
  });

  describe('axios method', function(){
    it('throw if you use it with no conditions', function(){
      expect(function(){
        mock.axios.get('/url');
      }).toThrow();
    });

    it('should always return a promise if conditions are met', function(){
      mock.when(function(){
        return 'TRUE';
      });

      expect(mock.axios('/url')).toEqual(jasmine.any(Promise));
      expect(mock.axios.get('/url')).toEqual(jasmine.any(Promise));
      expect(mock.axios.delete('/url')).toEqual(jasmine.any(Promise));
      expect(mock.axios.head('/url')).toEqual(jasmine.any(Promise));
      expect(mock.axios.post('/url', {})).toEqual(jasmine.any(Promise));
      expect(mock.axios.put('/url', {})).toEqual(jasmine.any(Promise));
      expect(mock.axios.patch('/url', {})).toEqual(jasmine.any(Promise));
    });
  });

  describe('when method', function(){
    it('should return a reference to itself', function(){
      expect(mock.when(function(){})).toBe(mock);
    });

    it('should allow registering conditions which match of off .axios', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios({url:'/url'})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.get', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios.get('/url')
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.delete', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios.delete('/url')
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.head', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios.head('/url')
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.post', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios.post('/url', {})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.put', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios.put('/url', {})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.patch', function(done){
      mock.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        mock.axios.patch('/url', {})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should fall through to secondary conditions', function(done){
      mock
        .when(function(config){
          if(config.url === '/url'){
            return 'SUCCESS';
          }
        })
        .when(function(config){
          if(config.url === '/test'){
            return 'TEST';
          }
        });

      verifyNotRejected(
        mock.axios.get('/test')
          .then(function(value){
            expect(value).toBe('TEST');
            done();
          }),

        done);
    });

    it('should have a shorthand version', function(done){
      mock.when('/endpoint').return('DATA');

      verifyNotRejected(
        mock.axios.post('/endpoint')
          .then(function(value){
            expect(value).toBe('DATA');
            done();
          })

        ,done);
    });

    it('should have a shorthand version that takes data', function(done){
      mock.when('/endpoint', {data:'yup'}).return('DATA');

      verifyNotRejected(
        mock.axios.post('/endpoint', {data:'yup'})
          .then(function(value){
            expect(value).toBe('DATA');
            done();
          })

        ,done);
    });

    it('should have a shorthand version that takes data and config', function(done){
      mock.when('/endpoint', {data:'yup'}, {headers:{}}).return('DATA');

      verifyNotRejected(
        mock.axios.post('/endpoint', {data:'yup'}, {headers:{}})
          .then(function(value){
            expect(value).toBe('DATA');
            done();
          })

        ,done);
    });

    it('should have a shorthand version eventually returns a reference to itself', function(){
      var actual = mock.when('/endpoint', {data:'yup'}, {headers:{}}).return('DATA');

      expect(actual).toBe(mock);
    });
  });

  describe('when.get method', function(){
    it('should be a shorthand for checking the method', function(done){
      mock.when.get('/api').return(true);

      verifyNotRejected(
        mock.axios.get('/api')
          .then(function(value){
            expect(value).toBe(true);
            done();
          }),

        done
      );
    });
  });

  describe('when.delete method', function(){
    it('should be a shorthand for checking the method', function(done){
      mock.when.delete('/api').return(true);

      verifyNotRejected(
        mock.axios.delete('/api')
          .then(function(value){
            expect(value).toBe(true);
            done();
          }),

        done
      );
    });
  });

  describe('when.head method', function(){
    it('should be a shorthand for checking the method', function(done){
      mock.when.head('/api').return(true);

      verifyNotRejected(
        mock.axios.head('/api')
          .then(function(value){
            expect(value).toBe(true);
            done();
          }),

        done
      );
    });
  });

  describe('when.post method', function(){
    it('should be a shorthand for checking the method', function(done){
      mock.when.post('/api', {stuff:'things'}).return(true);

      verifyNotRejected(
        mock.axios.post('/api', {stuff:'things'})
          .then(function(value){
            expect(value).toBe(true);
            done();
          }),

        done
      );
    });
  });

  describe('when.put method', function(){
    it('should be a shorthand for checking the method', function(done){
      mock.when.put('/api', {stuff:'things'}).return(true);

      verifyNotRejected(
        mock.axios.put('/api', {stuff:'things'})
          .then(function(value){
            expect(value).toBe(true);
            done();
          }),

        done
      );
    });
  });

  describe('when.patch method', function(){
    it('should be a shorthand for checking the method', function(done){
      mock.when.patch('/api', {stuff:'things'}).return(true);

      verifyNotRejected(
        mock.axios.patch('/api', {stuff:'things'})
          .then(function(value){
            expect(value).toBe(true);
            done();
          }),

        done
      );
    });
  });

  describe('reset method', function(){
    it('should remove all conditions', function(){
      mock.when('/home').return(true);

      expect(function(){
        mock.axios.get('/home');
      }).not.toThrow();

      mock.reset();

      expect(function(){
        mock.axios.get('/home');
      }).toThrow();
    });
  });

  describe('axios.all method', function(){
    it('should function like Promise.all', function(done){
      var promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ];

      verifyNotRejected(
        mock.axios.all(promises)
          .then(function(values){
            expect(values).toEqual([1,2,3]);
            done();
          })
        ,done);
    });
  });

  describe('axios.spread method', function(){
    it('should function like spread', function(){
      var sum;
      function add(a,b,c){
        sum = a + b + c;
      }

      mock.axios.spread(add)([3,4,5]);

      expect(sum).toBe(12);
    });
  });

  describe('transformResponse', function(){
    it('should run all transforms on the provided value', function(done){
      mock.when('/api/delete').return({data:5});

      verifyNotRejected(
        mock.axios.get('/api/delete', {
          transformResponse: [function(data){
            data.data *= 2;
            return data;
          }]
        })
          .then(function(value){
            expect(value).toEqual({data: 10});
            done();
          })

        ,done);
    });
  });

  describe('transformRequest', function(){
    it('should transform the request before it tries to match them', function(done){
      mock.when.post('/obj/insert', { count: 15 }).return(true);

      verifyNotRejected(
        mock.axios.post('/obj/insert', { count: 5 }, {
          transformRequest: [
            function(data){
              data.count = data.count * 3;
              return data;
            }
          ]
        })
          .then(function(value){
            expect(value).toBe(true);
            done();
          })

        ,done);
    });
  });

  describe('params', function(){
    it('should match properly', function(done){
      mock.when.get('/api?ID=FOO&name=BAR').return(1);

      var promises = [
        mock.axios.get('/api', {params: {ID:'FOO', 'name': 'BAR'}}),
        mock.axios.get('/api', {params: {'name': 'BAR', ID:'FOO'}}),
        mock.axios.get('/api?ID=FOO&name=BAR'),
        mock.axios.get('/api?ID=FOO', {params:{'name':'BAR'}})
      ];

      verifyNotRejected(
        Promise.all(promises)
          .then(function(values){
            expect(values).toEqual([1,1,1,1]);
            done();
          })

        ,done);
    });
  });

  describe('baseURL', function(){
    it('should match properly', function(done){
      mock.when.get('http://domain/api').return(1);

      var promises = [
        mock.axios.get('http://domain/api'),
        mock.axios.get('/api', {baseURL:'http://domain'}),
        mock.axios.get('/api', {baseURL:'http://domain/'})
      ];

      verifyNotRejected(
        Promise.all(promises)
          .then(function(values){
            expect(values).toEqual([1,1,1]);
            done();
          })

        ,done);
    });
  });

  describe('instance support', function(){
    it('should match against instances as well', function(done){
      mock.when.get('/url').return('foo');

      var instance = mock.axios.create();

      verifyNotRejected(
        instance.get('/url')
          .then(function(value){
            expect(value).toBe('foo');
            done();
          })

        ,done);
    });

    it('should take a config at instance creation', function(done){
      mock.when(function(config){
        return config;
      });

      var instance = mock.axios.create({foo:'bar'});

      verifyNotRejected(
        instance.get('/')
          .then(function(value){
            expect(value.foo).toBe('bar');
            done();
          })

        ,done);
    });

    it('should work for all instance methods', function(done){
      mock.when(function(config){
        return config.method;
      });

      var instance = mock.axios.create();

      var promises = [
        instance.request({url:'/', method:'get'}),
        instance.get('/'),
        instance.delete('/'),
        instance.head('/'),
        instance.post('/'),
        instance.put('/'),
        instance.patch('/')
      ];

      verifyNotRejected(
        Promise.all(promises)
          .then(function(values){
            expect(values).toEqual([
              'get',
              'get',
              'delete',
              'head',
              'post',
              'put',
              'patch'
            ]);
            done();
          })

        ,done);
    });
  });
});
