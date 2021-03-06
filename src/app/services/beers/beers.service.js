(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('beersService', beersService);

  beersService.$inject = ['$http'];

  function beersService($http) {
    var service = {
      getAll: getAll
    };

    return service;

    function getAll() {
      return $http.get('https://california-beers.herokuapp.com/beers')
      .then(function(res) {
        return res.data.map(_parseBeerAbv);
      });
    }

    function _parseBeerAbv(beer) {
      if (beer.Abv === '?') {
        beer.Abv = 4.5;
      } else {
        beer.Abv = Number(beer.Abv.slice(0, -1));
      }
      return beer;
    }
  }
})();
