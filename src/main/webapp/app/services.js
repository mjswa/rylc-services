(function (angular) {

  /*
   * backendService
   */

  function backendServiceFactory($rootScope, $q) {

    function login(username, password) {
      var deferred = $q.defer();
      setTimeout(function () {
        deferred.resolve({name:username});
        $rootScope.$digest();
      }, 50);
      return deferred.promise;
    }

    function searchRentals() {
      var deferred = $q.defer();
      setTimeout(function () {
        deferred.resolve([
          {"car":{"description":"Meriva", "id":988, "manufacturer":"Opel", "price":65.50}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":178},
          {"car":{"description":"Golf", "id":995, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 06), "hireStartDate":new Date(2011, 11, 05), "id":179},
          {"car":{"description":"Golf", "id":1008, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 13), "hireStartDate":new Date(2011, 11, 13), "id":180}
        ]);
        $rootScope.$digest();
      }, 50);
      return deferred.promise;
    }

    return {
      login:login,
      searchRentals:searchRentals
    }
  }

  backendServiceFactory.$inject = ["$rootScope", "$q"];

  /*
   * rentalService
   */

  function rentalServiceFactory() {
    function totalPrice(pricePerDay, startDate, endDate) {
      return pricePerDay * (1 + (endDate - startDate) / 1000 / 60 / 60 / 24);
    }

    return {
      totalPrice:totalPrice
    };
  }

  /*
   * utilsService
   */

  function utilsServiceFactory() {

    function parseSimpleDate(dateAsString) {
      if (!dateAsString) {
        return undefined;
      }
      var parts = dateAsString.split('.');
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    function formatSimpleDate(date) {
      if (!date) {
        return undefined;
      }
      var month = String(date.getMonth() + 1);
      if (month.length == 1) {
        month = "0" + month;
      }
      var day = String(date.getDate());
      if (day.length == 1) {
        day = "0" + day;
      }
      return day + "." + month + "." + date.getFullYear();
    }

    function validateSimpleDate(dateAsString) {
      var simpleDateRegex = /^\d\d?\.\d\d?\.\d\d(\d\d)?$/;
      return dateAsString && dateAsString.match(simpleDateRegex);
    }

    function parseHtml5Date(dateAsString) {
      if (!dateAsString) {
        return undefined;
      }
      var parts = dateAsString.split('-');
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function formatHtml5Date(date) {
      if (!date) {
        return undefined;
      }
      var month = String(date.getMonth() + 1);
      if (month.length == 1) {
        month = "0" + month;
      }
      var day = String(date.getDate());
      if (day.length == 1) {
        day = "0" + day;
      }
      return date.getFullYear() + '-' + month + "-" + day;
    }

    function validateHtml5Date(dateAsString) {
      var dateRegex = /^\d\d\d\d-\d\d-\d\d$/;
      return dateAsString && dateAsString.match(dateRegex);
    }

    var _html5DateSupport;

    function supportsHtml5Date() {
      if (_html5DateSupport === undefined) {
        var d = document.createElement('input');
        d.setAttribute('type', 'date');
        _html5DateSupport = d.type === 'date';
      }
      return _html5DateSupport;
    }

    function dayCount(startDate, endDate) {
      return 1 + (endDate - startDate) / 1000 / 60 / 60 / 24;
    }

    var parseDate = supportsHtml5Date() ? parseHtml5Date : parseSimpleDate;
    var formatDate = supportsHtml5Date() ? formatHtml5Date : formatSimpleDate;
    var validateDate = supportsHtml5Date() ? validateHtml5Date : validateSimpleDate;

    return {
      parseSimpleDate:parseSimpleDate,
      formatSimpleDate:formatSimpleDate,
      validateSimpleDate:validateSimpleDate,
      parseHtml5Date:parseHtml5Date,
      formatHtml5Date:formatHtml5Date,
      validateHtml5Date:validateHtml5Date,
      parseDate:parseDate,
      formatDate:formatDate,
      validateDate:validateDate,
      dayCount:dayCount
    };

  }

  /*
   * define angular module
   */

  var module = angular.module("rylc-services", []);
  module.factory("backendService", backendServiceFactory);
  module.factory("rentalService", rentalServiceFactory);
  module.factory("utilsService", utilsServiceFactory);

})(angular);