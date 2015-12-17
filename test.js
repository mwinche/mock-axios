var moxios = require('./index.js');

function verifyNotRejected(promise, done){
  promise.catch(function(err){
    expect(err).not.toBeDefined();
    expect('This should not happen').not.toBeDefined();
    done();
  });
}

describe('moxios', function(){
  beforeEach(function(){
    moxios.reset();
  });

  describe('axios method', function(){
    it('throw if you use it with no conditions', function(){
      expect(function(){
        moxios.axios.get('/url');
      }).toThrow();
    });

    it('should always return a promise if conditions are met', function(){
      moxios.when(function(){
        return 'TRUE';
      });

      expect(moxios.axios('/url')).toEqual(jasmine.any(Promise));
      expect(moxios.axios.get('/url')).toEqual(jasmine.any(Promise));
      expect(moxios.axios.delete('/url')).toEqual(jasmine.any(Promise));
      expect(moxios.axios.head('/url')).toEqual(jasmine.any(Promise));
      expect(moxios.axios.post('/url', {})).toEqual(jasmine.any(Promise));
      expect(moxios.axios.put('/url', {})).toEqual(jasmine.any(Promise));
      expect(moxios.axios.patch('/url', {})).toEqual(jasmine.any(Promise));
    });
  });

  describe('when method', function(){
    it('should return a reference to itself', function(){
      expect(moxios.when(function(){})).toBe(moxios);
    });

    it('should allow registering conditions which match of off .axios', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios({url:'/url'})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.get', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios.get('/url')
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.delete', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios.delete('/url')
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.head', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios.head('/url')
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.post', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios.post('/url', {})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.put', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios.put('/url', {})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should allow registering conditions which match of off .axios.patch', function(done){
      moxios.when(function(config){
        if(config.url === '/url'){
          return 'SUCCESS';
        }
      });

      verifyNotRejected(
        moxios.axios.patch('/url', {})
          .then(function(value){
            expect(value).toBe('SUCCESS');
            done();
          }),

        done);
    });

    it('should fall through to secondary conditions', function(done){
      moxios
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
        moxios.axios.get('/test')
          .then(function(value){
            expect(value).toBe('TEST');
            done();
          }),

        done);
    });

    it('should have a shorthand version', function(done){
      moxios.when('/endpoint').return('DATA');

      verifyNotRejected(
        moxios.axios.post('/endpoint')
          .then(function(value){
            expect(value).toBe('DATA');
            done();
          })

        ,done);
    });

    it('should have a shorthand version that takes data', function(done){
      moxios.when('/endpoint', {data:'yup'}).return('DATA');

      verifyNotRejected(
        moxios.axios.post('/endpoint', {data:'yup'})
          .then(function(value){
            expect(value).toBe('DATA');
            done();
          })

        ,done);
    });

    it('should have a shorthand version that takes data and config', function(done){
      moxios.when('/endpoint', {data:'yup'}, {headers:{}}).return('DATA');

      verifyNotRejected(
        moxios.axios.post('/endpoint', {data:'yup'}, {headers:{}})
          .then(function(value){
            expect(value).toBe('DATA');
            done();
          })

        ,done);
    });

    it('should have a shorthand version eventually returns a reference to itself', function(){
      var actual = moxios.when('/endpoint', {data:'yup'}, {headers:{}}).return('DATA');

      expect(actual).toBe(moxios);
    });
  });

  describe('when.get method', function(){
    it('should be a shorthand for checking the method', function(done){
      moxios.when.get('/api').return(true);

      verifyNotRejected(
        moxios.axios.get('/api')
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
      moxios.when.delete('/api').return(true);

      verifyNotRejected(
        moxios.axios.delete('/api')
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
      moxios.when.head('/api').return(true);

      verifyNotRejected(
        moxios.axios.head('/api')
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
      moxios.when.post('/api', {stuff:'things'}).return(true);

      verifyNotRejected(
        moxios.axios.post('/api', {stuff:'things'})
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
      moxios.when.put('/api', {stuff:'things'}).return(true);

      verifyNotRejected(
        moxios.axios.put('/api', {stuff:'things'})
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
      moxios.when.patch('/api', {stuff:'things'}).return(true);

      verifyNotRejected(
        moxios.axios.patch('/api', {stuff:'things'})
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
      moxios.when('/home').return(true);

      expect(function(){
        moxios.axios.get('/home');
      }).not.toThrow();

      moxios.reset();

      expect(function(){
        moxios.axios.get('/home');
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
        moxios.axios.all(promises)
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

      moxios.axios.spread(add)([3,4,5]);

      expect(sum).toBe(12);
    });
  });

  describe('transformResponse', function(){
    it('should run all transforms on the provided value', function(done){
      moxios.when('/api/delete').return({data:5});

      verifyNotRejected(
        moxios.axios.get('/api/delete', {
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
      moxios.when.post('/obj/insert', { count: 15 }).return(true);

      verifyNotRejected(
        moxios.axios.post('/obj/insert', { count: 5 }, {
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
      moxios.when.get('/api?ID=FOO&name=BAR').return(1);

      var promises = [
        moxios.axios.get('/api', {params: {ID:'FOO', 'name': 'BAR'}}),
        moxios.axios.get('/api', {params: {'name': 'BAR', ID:'FOO'}}),
        moxios.axios.get('/api?ID=FOO&name=BAR'),
        moxios.axios.get('/api?ID=FOO', {params:{'name':'BAR'}})
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
      moxios.when.get('http://domain/api').return(1);

      var promises = [
        moxios.axios.get('http://domain/api'),
        moxios.axios.get('/api', {baseURL:'http://domain'}),
        moxios.axios.get('/api', {baseURL:'http://domain/'})
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
      moxios.when.get('/url').return('foo');

      var instance = moxios.axios.create();

      verifyNotRejected(
        instance.get('/url')
          .then(function(value){
            expect(value).toBe('foo');
            done();
          })

        ,done);
    });

    it('should take a config at instance creation', function(done){
      moxios.when(function(config){
        return config;
      });

      var instance = moxios.axios.create({foo:'bar'});

      verifyNotRejected(
        instance.get('/')
          .then(function(value){
            expect(value.foo).toBe('bar');
            done();
          })

        ,done);
    });

    it('should work for all instance methods', function(done){
      moxios.when(function(config){
        return config.method;
      });

      var instance = moxios.axios.create();

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

  describe('error statuses', function(){
    it('should handle them', function(done){
      moxios.when(function(){
        return {status:400};
      });

      moxios.axios.get('/')
        .then(function(){
          expect('This should not get hit').not.toBeDefined();
          done();
        })
        .catch(function(response){
          expect(response.status).toBe(400);
          done();
        });
    });
  });
});
