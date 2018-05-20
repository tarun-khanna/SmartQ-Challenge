app.factory("apiFactory", function($q, $http) {
  return {
    getData: function() {
      const deferredObject = $q.defer();
      $http.get("https://thesmartq.firebaseio.com/menu.json").then(
        data => {
          deferredObject.resolve(data.data);
        },
        err => {
          deferredObject.reject(err);
        }
      );
      return deferredObject.promise;
    }
  };
});
