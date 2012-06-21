describe("backendSerivce", function () {
  var backendService;

  beforeEach(function () {
    jasmine.Clock.useMock();
    module("rylc-services");
    inject(function (_backendService_) {
      backendService = _backendService_;
    });
  });

  describe("login", function () {
    it("should return promise with expected customer", function () {
      var someUsername = "someUsername";
      var customer;
      backendService.login(someUsername, "somePassword").then(function (data) {
        customer = data;
      });
      jasmine.Clock.tick(50);
      expect(customer).toEqual({name:someUsername});
    });
  });

  describe("searchRentals", function () {
    it("should return promise with expected rentals", function () {
      var expectedRentals = [
        {"car":{"description":"Meriva", "id":988, "manufacturer":"Opel", "price":65.50}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":178},
        {"car":{"description":"Golf", "id":995, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 06), "hireStartDate":new Date(2011, 11, 05), "id":179},
        {"car":{"description":"Golf", "id":1008, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 13), "hireStartDate":new Date(2011, 11, 13), "id":180}
      ];
      var actualRentals;
      backendService.searchRentals().then(function (data) {
        actualRentals = data;
      });
      jasmine.Clock.tick(50);
      expect(actualRentals).toEqual(expectedRentals);
    });
  });

});