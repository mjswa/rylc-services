(function (angular) {

  /*
   * Application Controller
   */

  function ApplicationController(backendService, rentalService, $scope, $navigate) {
    $scope.username = "";
    $scope.password = "";

    $scope.login = function () {
      backendService.login($scope.username, $scope.password).then(function (customer) {
        $scope.customer = customer;
        $navigate("#welcomePage");
      });
    };

    $scope.loginPossible = function () {
      return $scope.username && $scope.password;
    };

    $scope.searchRentals = function () {
      backendService.searchRentals().then(function (rentals) {
        $scope.rentals = rentals;
      });
    };

    $scope.totalPrice = function (rental) {
      return rentalService.totalPrice(rental.car.price, rental.hireStartDate, rental.hireEndDate);
    };
  }

  ApplicationController.$inject = ["backendService", "rentalService", "$scope", "$navigate"];

  /*
   * define angular module
   */

  var module = angular.module("rylc-controllers", ["rylc-services"]);
  module.controller("rylc.ApplicationController", ApplicationController);

})(angular);
