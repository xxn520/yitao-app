/**
 * Created by m2mbob on 16/4/28.
 */
angular
    .module('yitao')
    .controller('AllCategoryController', function($scope, supersonic, Restangular, BaseUrl) {

        $scope.BaseUrl = BaseUrl;
        $scope.tree = [];

        supersonic.ui.views.current.whenVisible(function() {
            //if ($scope.tree.length !== 0) {
                Restangular.one("category", "tree").getList().then(function(tree) {
                    $scope.tree = tree.plain();
                    supersonic.logger.log($scope.tree);
                });
            //}
        });

    });
