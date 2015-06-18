app.factory('forecast', ['$http', function($http) {
  return $http.get('http://api.openweathermap.org/data/2.5/forecast?q=Mankato,MN')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
