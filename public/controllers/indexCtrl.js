app.controller("indexCtrl", function($scope, apiFactory) {
  let menuRes = apiFactory.getData();
  menuRes.then(
    data => {
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
});
