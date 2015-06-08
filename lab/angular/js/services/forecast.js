app.factory('forecast', ['$http', function($http) {
  return $http.get('https://api.myjson.com/bins/2cyfg')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
