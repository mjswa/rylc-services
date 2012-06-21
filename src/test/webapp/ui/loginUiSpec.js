describeUi('login', '/rylc-services/index.html', function () {
  var someUsername = "someUsername";
  var somePassword = "somePassword";
  var someCustomer = {id:"someID", name:"someName"};

  beforeLoad(function () {
    mockBackend();
  });

  it('should show login page when visiting the application', function () {
    runs(function () {
      expect(activePageId()).toBe('loginPage');
    });
  });

  it('should not allow login when the username or password is empty', function () {
    runs(function () {
      value("#loginPage_username", '');
      value("#loginPage_password", '');
      expect(enabled(".login")).toBeFalsy();
    });
    runs(function () {
      value("#loginPage_username", someUsername);
      value("#loginPage_password", '');
      expect(enabled(".login")).toBeFalsy();
    });
    runs(function () {
      value("#loginPage_username", '');
      value("#loginPage_password", somePassword);
      expect(enabled(".login")).toBeFalsy();
    });
  });

  it('should allow login when the username and password are not empty', function () {
    runs(function () {
      value("#loginPage_username", someUsername);
      value("#loginPage_password", somePassword);
      expect(enabled(".login")).toBeTruthy();
    });
  });

  it('should show the welcome page after successful login', function () {
    runs(function () {
      backendServiceResult("login").resolve(someCustomer);
      value("#loginPage_username", someUsername);
      value("#loginPage_password", somePassword);
      click(".login");
    });
    runs(function () {
      expect(activePageId()).toBe('welcomePage');
    });
  });

    it('should greet the user after successful login', function () {
      runs(function () {
        backendServiceResult("login").resolve(someCustomer);
        value("#loginPage_username", someUsername);
        value("#loginPage_password", somePassword);
        click(".login");
      });
      runs(function () {
          expect(value(".greeting")).toBe('Hallo ' + someCustomer.name);
      });
    });

  it('should show an error when the backend reports an error on login', function () {
    var someBackendError = "someBackendError";
    runs(function () {
      backendServiceResult('login').reject(someBackendError);
      value("#loginPage_username", someUsername);
      value("#loginPage_password", somePassword);
      click(".login");
    });
    runs(function () {
      expect(activePageId()).toBe('loginPage');
      expect(value(".error")).toEqual(someBackendError);
    });
  });
});
