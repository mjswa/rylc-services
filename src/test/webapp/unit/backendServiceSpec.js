describe("backendSerivce", function () {
  var backendBaseUri = '/rylc-services/api';
  var someUsername = "someUsername";
  var somePassword = "somePassword";

  var backendService, $httpBackend;

  beforeEach(function () {
    module("rylc-services");
    inject(function (_backendService_, _$httpBackend_) {
      backendService = _backendService_;
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("login", function () {
    var url = backendBaseUri + '/customers?username=' + someUsername;

    it("should GET customer by username using basic auth", function () {
      $httpBackend.expectGET(url, authorized);
      $httpBackend.whenGET(url).respond({});
      backendService.login(someUsername, somePassword);
      $httpBackend.flush();
    });

    it("should forward data of $http result as result", function () {
      var actualData, expectedData = "someData";
      $httpBackend.whenGET(url).respond(expectedData);
      backendService.login(someUsername, somePassword).then(function (data) {
        actualData = data;
      });
      expect(actualData).toBeUndefined();
      $httpBackend.flush();
      expect(actualData).toBe(expectedData);
    });

    it("should return the expected error message when $http fails with 401", function () {
      var message;
      $httpBackend.whenGET(url).respond(401, {});
      backendService.login(someUsername, somePassword).then(null, function (data) {
        message = data;
      });
      expect(message).toBeUndefined();
      $httpBackend.flush();
      expect(message).toBe("Zugriff verweigert.");
    });

    it("should return the expected error message when $http fails for other reasons", function () {
      var message;
      $httpBackend.whenGET(url).respond(500, {});
      backendService.login(someUsername, somePassword).then(null, function (data) {
        message = data;
      });
      expect(message).toBeUndefined();
      $httpBackend.flush();
      expect(message).toBe("Ein unbekannter Fehler ist aufgetreten.");
    });
  });

  describe("searchRentals", function () {
    var someID = "someID";
    var url = backendBaseUri + '/rentals?customerId=' + someID;

    it("should GET rentals by customer ID using basic auth", function () {
      $httpBackend.expectGET(url, authorized);
      $httpBackend.whenGET(url).respond({});
      backendService.searchRentals(someID, someUsername, somePassword);
      $httpBackend.flush();
    });

    it("should forward data of $http result as result", function () {
      var actualData, expectedData = "someData";
      $httpBackend.whenGET(url).respond(expectedData);
      backendService.searchRentals(someID).then(function (data) {
        actualData = data;
      });
      expect(actualData).toBeUndefined();
      $httpBackend.flush();
      expect(actualData).toBe(expectedData);
    });

    it("should return the expected error message when $http fails with 401", function () {
      var message;
      $httpBackend.whenGET(url).respond(401, {});
      backendService.searchRentals(someID).then(null, function (data) {
        message = data;
      });
      expect(message).toBeUndefined();
      $httpBackend.flush();
      expect(message).toBe("Zugriff verweigert.");
    });

    it("should return the expected error message when $http fails for other reasons", function () {
      var message;
      $httpBackend.whenGET(url).respond(500, {});
      backendService.searchRentals(someID).then(null, function (data) {
        message = data;
      });
      expect(message).toBeUndefined();
      $httpBackend.flush();
      expect(message).toBe("Ein unbekannter Fehler ist aufgetreten.");
    });
  });

  function authorized(headers) {
    return headers["Authorization"] === "Basic " + Base64.encode(someUsername + ':' + somePassword);
  }

});