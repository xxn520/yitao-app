/**
 * Created by m2mbob on 16/5/20.
 */

angular.module("yitao").controller(
    "StarController", function($scope, supersonic, Restangular, BaseUrl, localStorageService) {

        $scope.BaseUrl = BaseUrl;

        var getItems = function() {
            Restangular.one("product", "stars").get({
                uid: localStorageService.get('userDetail').id
            }).then(function(data) {
                $scope.items = data.plain();
            });
        };

        $scope.toDetail = function(id) {
            supersonic.ui.layers.push("yitao#detail?id="+ id);
        }

        supersonic.ui.views.current.whenVisible(function(){
            getItems();
        });

    });
