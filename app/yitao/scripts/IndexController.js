angular
    .module('yitao')
    .controller('IndexController', function($scope, supersonic, Restangular, BaseUrl) {

        $scope.BaseUrl = BaseUrl;
        $scope.healths = [];
        $scope.recommends = [];
        $scope.brands = [];

        supersonic.ui.views.current.whenVisible(function () {
            if ($scope.recommends.length === 0) {
                Restangular.one('product', 'recommend').getList().then(function(recommends){
                    $scope.recommends = recommends.plain();
                });
            }
            if ($scope.healths.length === 0) {
                Restangular.one('product', 'health').getList().then(function(healths){
                    $scope.healths = healths.plain();
                });
            }
            if ($scope.brands.length === 0) {
                Restangular.all('brand').getList().then(function(brands){
                    $scope.brands = brands.plain();
                });
            }
        })

        $scope.toCategory = function(){
            supersonic.ui.layers.push("yitao#all-category");
        }

        $scope.toNew = function(){
            supersonic.ui.layers.push("yitao#products?id=17");
        }

        $scope.toSpecial = function(){
            supersonic.ui.layers.push("yitao#products?id=18");
        }

        $scope.toDetail = function(id) {
            supersonic.ui.layers.push("yitao#detail?id="+ id);
        }

        $scope.toSearch = function(id) {
            supersonic.ui.layers.push("yitao#search");
        }

    });