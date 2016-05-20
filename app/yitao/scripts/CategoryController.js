/**
 * Created by m2mbob on 16/5/16.
 */
angular.module("yitao").controller(
    "CategoryController", function($scope, supersonic, Restangular, BaseUrl) {

        var id = 0;
        $scope.BaseUrl = BaseUrl;
        $scope.categories = [];

        var showCategory = function(cateid) {
            Restangular.one("category", cateid).get().then(function(category){
                $scope.category = category;
                Restangular.one('category').one('parent', id).getList().then(function(categories){
                    $scope.categories = categories;
                });
            }, function(err){
                supersonic.logger.log(err);
            });
        };

        var stopListening = supersonic.ui.views.current.params.onValue(function(params) {
            id = params.id;
            showCategory(params.id);
        });

        stopListening();

        $scope.toCategory = function (cid) {
            supersonic.ui.layers.push('yitao#products?id='+cid);
        }

    });
