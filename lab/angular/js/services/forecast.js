app.factory('forecast', ['$http', function($http) {
  return $http.get('http://jjjaspersen.com/angular/forecast.json')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
