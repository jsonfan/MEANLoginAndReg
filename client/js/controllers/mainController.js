myApp.controller('mainController', function($scope, $location, userFactory){
  $scope.registeredUser = {};
  $scope.error = {};
  $scope.createUser = function(input){
    console.log('make this new user', input);
    //call factory
    userFactory.createUser(input, function(response){
      console.log(response);
    })
    $scope.newUser = {};

  }

  $scope.loginUser = function(input){
    console.log('trying to login user with', input);
    //call factory
    userFactory.loginUser(input, function(response){
      console.log(response);
      if(response.err){
        console.log('there was an error!');
        $scope.error.message = response.err;
      } else {
        console.log('no error, log them in');
        $location.url('/dashboard');
      }
    })
    $scope.userData = {};
  }

  $scope.loginFacebook = function(){
    console.log('logging in with fb');
  }
  $scope.loginGoogle = function(){
    console.log('logging in with google');
  }
});
