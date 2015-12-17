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
  });
});
