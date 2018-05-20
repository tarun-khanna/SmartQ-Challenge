app.controller("indexCtrl", function($scope, apiFactory) {
  $scope.cart = [];
  let menuRes = apiFactory.getData();
  menuRes.then(
    data => {
      console.log(data);

      $scope.menu = data;
    },
    err => {
      console.log(err);
    }
  );
  $scope.addItemToCart = function(item) {
    console.log("item clicked=", item);
    let i = $scope.cart.indexOf(item);
    if (i == -1) {
      console.log("Item is not in cart");
      item["quantity"] = 1;
      $scope.cart.push(item);
    } else {
      $scope.cart[i]["quantity"]++;
    }
  };
  $scope.removeItemFromCart = function(item) {
    console.log("item clicked=", item);
    let i = $scope.cart.indexOf(item);
    if (i != -1) {
      if ($scope.cart[i]["quantity"] == 1) {
        $scope.cart.splice(i, 1);
      } else $scope.cart[i]["quantity"]--;
    }
  };
  $scope.getQuantity = function(item) {
    let i = $scope.cart.indexOf(item);
    if (i != -1) {
      return $scope.cart[i]["quantity"];
    }
  };
  $scope.bill = function() {
    let totalPrice = 0;
    $scope.cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
});
