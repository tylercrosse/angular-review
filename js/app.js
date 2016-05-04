"use strict";

(function(){
  angular
    .module("app", [
      "ui.router",
      "ngResource"
    ])
    .config([
      "$stateProvider",
      RouterFunc
    ])
    .controller("MainCtlr", MainControllerFunc)
    .controller("NewTodoCtlr", NewTodoControllerFunc)
    .factory("TodoFactory", TodoFactoryFunc)

  TodoFactoryFunc.$inject = ["$resource"]
  function TodoFactoryFunc($resource) {
    return $resource("http://localhost:3000/todos/:id.json", {})
  }

  function RouterFunc($stateProvider) {
    $stateProvider
      .state("todosIndex", {
        url: "/todos",
        templateUrl: "js/todos.template.html",
        controller: "MainCtlr",
        controllerAs: "vm"
      }).state("newTodo", {
        url: "/todos/new",
        templateUrl: "js/todoForm.template.html",
        controller: "NewTodoCtlr",
        controllerAs: "vm"
      }).state("todosShow", {
        url: "/todos/:id",
        templateUrl: "js/todoShow.template.html",
        controller: "ShowTodoCtlr",
        controllerAs: "vm"
      })
}

  MainControllerFunc.$inject = ["TodoFactory"]
  function MainControllerFunc(TodoFactory) {
    var vm = this;
    vm.todos = TodoFactory.query();
  }

  NewTodoControllerFunc.$inject = ["$state", "TodoFactory"];
  function NewTodoControllerFunc($state, TodoFactory) {
    var vm = this;

    vm.newTodo = new TodoFactory();

    vm.create = function() {
      vm.newTodo.$save().then(function(res) {
        $state.go("todosShow({id: res.id})")
      });
    }
  }
})();
