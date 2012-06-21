describeUi('rentalHistory', '/rylc-services/index.html#rentalHistoryPage', function () {
  var someRentals = [
    {"car":{"description":"Meriva", "id":988, "manufacturer":"Opel", "price":65.50}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":178},
    {"car":{"description":"Golf", "id":995, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 06), "hireStartDate":new Date(2011, 11, 05), "id":179},
    {"car":{"description":"Golf", "id":1008, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 13), "hireStartDate":new Date(2011, 11, 13), "id":180}
  ];

  beforeLoad(function () {
    mockBackend();
  });

  it('should show the customer name', function () {
    var someCustomer = {name:"someName"};
    runs(function () {
      activePageScope().ctrl.customer = someCustomer;
      activePageScope().$digest();
    });
    runs(function () {
        expect(value(".greeting")).toBe('Buchungen von ' + someCustomer.name);
    });
  });

  it('should show the expected number of rentals', function () {
    backendServiceResult("searchRentals").resolve(someRentals);
    runs(function () {
      expect(count('.rental')).toBe(someRentals.length);
    });
  });

  it('should show the expected fields for a rental', function () {
    backendServiceResult("searchRentals").resolve(someRentals);
    runs(function () {
      var someRental = someRentals[0];
      expect(value(".manufacturer:first")).toBe(someRental.car.manufacturer);
      expect(value(".description:first")).toBe(someRental.car.description);
      expect(value(".startDate:first")).toBe('07.11.2011');
      expect(value(".endDate:first")).toBe('07.11.2011');
      expect(value(".totalPrice:first")).toBe('\u20AC65.50');
    });
  });

});
