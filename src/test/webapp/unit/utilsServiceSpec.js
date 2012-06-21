describe("utilsService", function () {
  var utilsService;

  beforeEach(function () {
    module('rylc-services');
    inject(function(_utilsService_) {
      utilsService = _utilsService_;
    })
  });

  describe("parseSimpleDate", function () {
    it("should return expected date for valide date string", function() {
      var dateAsString = "25.05.2011";
      var expectedDate = new Date(2011, 5 - 1, 25);
      expect(expectedDate).toEqual(utilsService.parseSimpleDate(dateAsString));
    });

    it("should return undefined if parameter is falsy", function() {
      expect(utilsService.parseSimpleDate(undefined)).toBeUndefined();
      expect(utilsService.parseSimpleDate(null)).toBeUndefined();
      expect(utilsService.parseSimpleDate("")).toBeUndefined();
    });
  });

  describe("parseHtml5Date", function () {
    it("should return expected date for valide date string", function() {
      var dateAsString = "2011-05-25";
      var expectedDate = new Date(2011, 5 - 1, 25);
      expect(expectedDate).toEqual(utilsService.parseHtml5Date(dateAsString));
    });

    it("should return undefined if parameter is falsy", function() {
      expect(utilsService.parseHtml5Date(undefined)).toBeUndefined();
      expect(utilsService.parseHtml5Date(null)).toBeUndefined();
      expect(utilsService.parseHtml5Date("")).toBeUndefined();
    });
  });

  describe("formatSimpleDate", function () {
    it("should return undefined if date is falsy", function() {
      expect(utilsService.formatSimpleDate(undefined)).toBeUndefined();
      expect(utilsService.formatSimpleDate(null)).toBeUndefined();
    });

    it("should return well formatted date as String", function() {
      var dateToBeFormatted = new Date(2010, 4, 5);
      var expectedString = "05.05.2010";
      expect(expectedString).toEqual(utilsService.formatSimpleDate(dateToBeFormatted));
      dateToBeFormatted = new Date(2010, 11, 11);
      expectedString = "11.12.2010";
      expect(expectedString).toEqual(utilsService.formatSimpleDate(dateToBeFormatted));
    });
  });

  describe("formatHtml5Date", function () {
    it("should return undefined if date is falsy", function() {
      expect(utilsService.formatHtml5Date(undefined)).toBeUndefined();
      expect(utilsService.formatHtml5Date(null)).toBeUndefined();
    });

    it("should return well formatted date as String", function() {
      var dateToBeFormatted = new Date(2010, 4, 5);
      var expectedString = "2010-05-05";
      expect(expectedString).toEqual(utilsService.formatHtml5Date(dateToBeFormatted));
      dateToBeFormatted = new Date(2010, 11, 11);
      expectedString = "2010-12-11";
      expect(expectedString).toEqual(utilsService.formatHtml5Date(dateToBeFormatted));
    });
  });

  describe("validateSimpleDate", function () {
    it("should return truthy if date format matches", function() {
      expect(utilsService.validateSimpleDate("25.05.2011")).toBeTruthy();
    });

    it("should return falsy if date format does not match", function() {
      expect(utilsService.validateSimpleDate("2010/13/30")).toBeFalsy();
    });
  });

  describe("validateHtml5Date", function () {
    it("should return truthy if date format matches", function() {
      expect(utilsService.validateHtml5Date("2011-05-25")).toBeTruthy();
    });

    it("should return falsy if date format does not match", function() {
      expect(utilsService.validateHtml5Date("2010/13/30")).toBeFalsy();
    });
  });

  describe("dayCount", function () {
    it("should return expected count", function() {
      var startDate = new Date(2011, 1, 1);
      var endDate = new Date(2011, 1, 11);
      expect(utilsService.dayCount(startDate, endDate)).toEqual(11);
    });
  });

});
