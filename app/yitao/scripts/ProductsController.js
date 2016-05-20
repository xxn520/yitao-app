/**
 * Created by m2mbob on 16/5/16.
 */
angular.module("yitao").controller(
    "ProductsController", function($scope, supersonic, Restangular, BaseUrl) {

        var nowPage = 0, id = 0;
        $scope.categories = [];
        $scope.BaseUrl = BaseUrl;

        var resetList = function() {
            $scope.items = [];
            $scope.total = 0;
            $scope.loading = true;
            nowPage = 0;
        };

        resetList();

        var showCategory = function(cateid) {
            Restangular.one("category", cateid).get().then(function(category){
                $scope.category = category;
            }, function(err){
                supersonic.logger.log(err);
            });
        };

        var stop = supersonic.ui.views.current.params.onValue(function(params) {
            id = params.id;
            showCategory(id);
        });

        stop();

        $scope.getItems = function(inview) {
            if (!inview) {
                return;
            }
            Restangular.all("product").getList({
                cid: id,
                page: nowPage++,
                "page-size": 6
            }).then(
                function(data) {
                    $scope.items = data.meta.first ? data
                        : $scope.items.concat(data);
                    $scope.loading = !data.meta.last;
                    $scope.total = data.meta.total_elements;
                }, function(response) {
                    //TODO 这里是加载不成功
                });
        };

        $scope.toDetail = function(id) {
            supersonic.ui.layers.push("yitao#detail?id="+ id);
        }

    });
