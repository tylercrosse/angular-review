"use strict";

(function(){
  angular
    .module("app", [
      "ui.router"
    ])
    .config([
      "$stateProvider",
      RouterFunc
    ])
    .controller("MainCtlr", MainControllerFunc)

  function RouterFunc($stateProvider) {

    $stateProvider
      .state("state1", {
        url: "/argh",
        templateUrl: "js/index.template.html",
        controller: "MainCtlr",
        controllerAs: "vm"
      })
      .state("state2", {
        url: "/whoa",
        template: "<h1>Whoa</h1>"
      })
  }

  function MainControllerFunc() {
    var vm = this;
    vm.panda = "pizza is king"

    vm.sayHello = function() {
      vm.panda = "pizza is life"
      console.log("Hello Pizza");
    }
  }
})();
