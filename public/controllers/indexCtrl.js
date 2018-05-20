app.controller("indexCtrl", function($scope, apiFactory, $document, $filter) {
  $scope.cart = [];
  let menuRes = apiFactory.getData();
  menuRes.then(
    data => {
      $scope.menu = data;
    },
    err => {
      console.log(err);
    }
  );
  let date = new Date();
  $scope.currTime = $filter("date")(new Date(), "HH:mm");

  $scope.categoryClicked = function(category) {
    let allListTabs = document.getElementsByClassName("list-group-item");
    for (let i = 0; i < allListTabs.length; ++i) {
      allListTabs[i].classList.remove("active");
    }
    let ele =
      category == "all"
        ? document.getElementById("allTab")
        : document.getElementsByClassName(category)[0];
    ele.classList.add("active");
  };
  $scope.addItemToCart = function(item) {
    let i = $scope.cart.indexOf(item);
    if (i == -1) {
      item["quantity"] = 1;
      $scope.cart.push(item);
    } else {
      $scope.cart[i]["quantity"]++;
    }
  };
  $scope.removeItemFromCart = function(item) {
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
  $scope.emptyCart = function() {
    $scope.cart.length = 0;
  };
});
