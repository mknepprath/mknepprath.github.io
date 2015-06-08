app.factory('forecast', ['$http', function($http) {
  return $http.get('https://api.myjson.com/bins/26iy4')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
