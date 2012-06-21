describe('ApplicationController', function () {
  var backendService, deferredLogin, deferredSearch, rentalService, $rootScope, $scope, $navigate;

  beforeEach(function () {
    module('rylc-controllers', function ($provide) {
      $provide.factory("backendService", function ($q) {
        deferredLogin = $q.defer();
        deferredSearch = $q.defer();
        backendService = {
          login:jasmine.createSpy(),
          searchRentals:jasmine.createSpy()
        };
        backendService.login.andReturn(deferredLogin.promise);
        backendService.searchRentals.andReturn(deferredSearch.promise);
        return backendService;
      });
      $provide.factory("rentalService", function () {
        rentalService = {
          totalPrice:jasmine.createSpy()
        };
        return rentalService;
      });
      $provide.factory('$navigate', function () {
        $navigate = jasmine.createSpy();
        return $navigate;
      });
    });
    inject(function ($controller, _$rootScope_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller("rylc.ApplicationController", {$scope:$scope});
    });
  });

  it('should create new application controller scope', function () {
    expect($scope).not.toBeUndefined();
  });

  it('should have falsy username and password after create', function () {
    expect($scope.username).toBeFalsy();
    expect($scope.password).toBeFalsy();
  });

  it('should have an undefined customer after create', function () {
    expect($scope.customer).toBeUndefined();
  });

  it('should have undefined rentals after create', function () {
    expect($scope.rentals).toBeUndefined();
  });

  describe('loginPossible', function () {
    it('should return false when username or passwort is empty', function () {
      $scope.username = "";
      $scope.password = "";
      expect($scope.loginPossible()).toBeFalsy();
      $scope.username = "someUsername";
      $scope.password = "";
      expect($scope.loginPossible()).toBeFalsy();
      $scope.username = "";
      $scope.password = "somePassword";
      expect($scope.loginPossible()).toBeFalsy();
    });

    it('should return true when username and password is not empty', function () {
      $scope.username = "someUsername";
      $scope.password = "somePassword";
      expect($scope.loginPossible()).toBeTruthy();
    });
  });

  describe('login', function () {
    it('should store the authenticated customer', function () {
      $scope.username = "someUsername";
      $scope.login();
      resolveLogin($scope.username);
      expect($scope.customer).toEqual({name:$scope.username});
    });
    it('should navigate to the welcomePage', function () {
      $scope.login();
      resolveLogin();
      expect($navigate).toHaveBeenCalledWith("#welcomePage");
    });
    function resolveLogin(username) {
      deferredLogin.resolve({name:username});
      $rootScope.$digest();
    }
  });

  describe('totalPrice', function () {
    it('should pass rental data to rentalService', function () {
      var rental = {
        car:{
          price:100
        },
        hireStartDate:new Date(2010, 0, 1),
        hireEndDate:new Date(2010, 0, 10)
      };
      $scope.totalPrice(rental);
      expect(rentalService.totalPrice).toHaveBeenCalledWith(rental.car.price, rental.hireStartDate, rental.hireEndDate);
    });
  });

  describe('searchRentals', function () {
    it('should store the search result', function () {
      var result = "someResult";
      $scope.searchRentals();
      deferredSearch.resolve(result);
      $rootScope.$digest();
      expect($scope.rentals).toBe(result);
    });
  });

});
