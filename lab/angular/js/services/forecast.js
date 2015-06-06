app.factory('forecast', ['$http', function($http) {
  return $http.get('http://www.mknepprath.com/lab/angular/example.json')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
