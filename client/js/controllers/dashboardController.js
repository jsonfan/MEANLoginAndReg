myApp.controller('dashboardController', function($scope, $location, userFactory){
  $scope.user = {};
  userFactory.getUser(function(data){
    console.log(data);
    $scope.user = data;
  })
  if(!$scope.user.username){
    $location.url('/');
  }
});
