app.factory('forecast', ['$http', function($http) {
  return $http.get('products.json')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
