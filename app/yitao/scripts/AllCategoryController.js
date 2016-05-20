/**
 * Created by m2mbob on 16/4/28.
 */
angular
    .module('yitao')
    .controller('AllCategoryController', function($scope, supersonic, Restangular, BaseUrl) {

        $scope.BaseUrl = BaseUrl;
        $scope.tree = [];

        supersonic.ui.views.current.whenVisible(function() {
            Restangular.one("category", "tree").getList().then(function(tree) {
                $scope.tree = tree.plain();
            });
        });

        $scope.toMore = function(id){
            supersonic.ui.layers.push("yitao#category?id="+ id);
        }

        $scope.toCategory = function(cid){
            supersonic.ui.layers.push("yitao#products?id="+ cid);
        }

    });
