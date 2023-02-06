(function () {
'use strict';

// Function that shows 'loading' gif
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Main page content snippets

// Function that inserts content at html element
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// First main page content loading
document.addEventListener("DOMContentLoaded", function (event) {
  showLoading("#main-content");
/*  menuCtrl.Inicio();
  $ajaxUtils.sendGetRequest(
    "snippets/home-snippet.html",
    function (homeHtml) {
      insertHtml("#main-content", homeHtml);
    },
    false);
*/
});

// JQuery function for menu collapsing to hamburger button on narrow screens
$(function () {
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

// AngularJS code
angular.module('SanEduardoApp', [])
  .controller('MenuController', menuController)
  .service('MenuService', menuService)
  .directive('mainContent', mainContentDirective)
  .directive('misasContent', misasContentDirective)
  .directive('homiliasContent', homiliasContentDirective)
  .directive('capillasContent', capillasContentDirective)
  .directive('sacramentosContent', sacramentosContentDirective)
  .directive('retirosContent', retirosContentDirective)
  .directive('economiaContent', economiaContentDirective)
  .directive('articulosContent', articulosContentDirective)
  .directive('caritasContent', caritasContentDirective)
  ;

// Main directive
function mainContentDirective() {
  var ddo = {
    templateUrl: "snippets/home-snippet.html" + '?_=' + new Date().getTime(),
    controller: mainContentDirectiveController,
    controllerAs: 'carousel',
    bindToController: true
  };
  return ddo;
}

mainContentDirectiveController.$inject = [ '$http'];
function mainContentDirectiveController( $http) {
  var carousel = this;

  // Get Json with Carousel to offer
  $http ({
    method: 'GET',
    url: 'media/carousel.json' + '?_=' + new Date().getTime()
  }).then( function (response) {
    carousel.list = response.data;
  }, function (error) {
    console.log(error);
  });
}

// Misas directive
function misasContentDirective() {
  var ddo = {
    templateUrl: "snippets/misas-snippet.html" + '?_=' + new Date().getTime(),
    controller: misasContentDirectiveController,
    controllerAs: 'misas',
    bindToController: true
};
  return ddo;
}

misasContentDirectiveController.$inject = [ '$http'];
function misasContentDirectiveController( $http) {
  var misas = this;

  // Get Json with Masses to offer
  $http ({
    method: 'GET',
    url: 'media/misas.json' + '?_=' + new Date().getTime()
  }).then( function (response) {
    misas.list = response.data;
  }, function (error) {
    console.log(error);
  });
}

// Homilies directive
function homiliasContentDirective() {
  var ddo = {
    templateUrl: "snippets/homilias-snippet.html" + '?_=' + new Date().getTime(),
    controller: homiliasContentDirectiveController,
    controllerAs: 'homilias',
    bindToController: true
  };
  return ddo;
}

homiliasContentDirectiveController.$inject = [ '$http'];
function homiliasContentDirectiveController( $http) {
  var homilias = this;

  // Get Json with Homilies to offer
  $http ({
    method: 'GET',
    url: 'media/homilias.json' + '?_=' + new Date().getTime()
  }).then( function (response) {
    homilias.list = response.data;
  });
}

// Capillas directive
function capillasContentDirective() {
  var ddo = {
    templateUrl: "snippets/capillas-snippet.html" + '?_=' + new Date().getTime()
  };
  return ddo;
}

// Sacramentos directive
function sacramentosContentDirective() {
  var ddo = {
    templateUrl: "snippets/sacramentos-snippet.html" + '?_=' + new Date().getTime()
  };
  return ddo;
}

// Retiros directive
function retirosContentDirective() {
  var ddo = {
    templateUrl: "snippets/retiros-snippet.html" + '?_=' + new Date().getTime()
  };
  return ddo;
}

// Economia directive
function economiaContentDirective() {
  var ddo = {
    templateUrl: "snippets/economia-snippet.html" + '?_=' + new Date().getTime(),
    controller: economiaContentDirectiveController,
    controllerAs: 'balances',
    bindToController: true
};
  return ddo;
}

economiaContentDirectiveController.$inject = [ '$http'];
function economiaContentDirectiveController( $http) {
  var balances = this;

  // Get Json with Balances
  $http ({
    method: 'GET',
    url: 'media/balances.json' + '?_=' + new Date().getTime()
  }).then( function (response) {
    balances.list = response.data;
  }, function (error) {
    console.log(error);
  });
}

// Articulos directive
function articulosContentDirective() {
  var ddo = {
    templateUrl: "snippets/articulos-snippet.html" + '?_=' + new Date().getTime()
  };
  return ddo;
}

// Caritas directive
function caritasContentDirective() {
  var ddo = {
    templateUrl: "snippets/caritas-snippet.html" + '?_=' + new Date().getTime()
  };
  return ddo;
}

menuService.$inject = [ '$http'];
function menuService( $http) {
  var menuSrvc = this;

  menuSrvc.GetMainContent = function (url) {
    showLoading("#main-content");
    return $http({
      method: 'GET',
      url: url
    }).then( function (response) {
      insertHtml("#main-content", response.data);
      $("#collapsable-nav").collapse('hide');
    });
  };
}

menuController.$inject = ['MenuService'];
function menuController( menuService) {
  var menuCtrl = this;

  menuCtrl.inicio = true;
  menuCtrl.homilias = false;
  menuCtrl.misas = false;
  menuCtrl.capillas = false;
  menuCtrl.sacramentos = false;
  menuCtrl.retiros = false;
  menuCtrl.economia = false;
  menuCtrl.articulos = false;
  menuCtrl.caritas = false;

  menuCtrl.Inicio = function () {
    menuCtrl.inicio = true;
    menuCtrl.homilias = false;
    menuCtrl.misas = false;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Misas = function () {
    menuCtrl.inicio = false;
    menuCtrl.homilias = false;
    menuCtrl.misas = true;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Homilias = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = true;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Capillas = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = false;
    menuCtrl.capillas = true;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Sacramentos = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = false;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = true;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Retiros = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = false;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = true;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Economia = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = false;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = true;
    menuCtrl.articulos = false;
    menuCtrl.caritas = false;
  };

  menuCtrl.Articulos = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = false;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = true;
    menuCtrl.caritas = false;
  };

  menuCtrl.Caritas = function () {
    menuCtrl.inicio = false;
    menuCtrl.misas = false;
    menuCtrl.homilias = false;
    menuCtrl.capillas = false;
    menuCtrl.sacramentos = false;
    menuCtrl.retiros = false;
    menuCtrl.economia = false;
    menuCtrl.articulos = false;
    menuCtrl.caritas = true;
  };

}

})();
