/**
 * Created by m2mbob on 16/5/21.
 */
angular
    .module('yitao')
    .controller('AnnouncementsController', function($scope, supersonic, Restangular) {

        var nowPage = 0, id = 0;
        $scope.announcements = [];

        var resetList = function() {
            $scope.announcements = [];
            $scope.total = 0;
            $scope.loading = true;
            nowPage = 0;
        };

        supersonic.ui.views.current.whenVisible(function () {
            resetList();
            Restangular.all("announcement").getList({
                page: nowPage++
            }).then(function(data) {
                $scope.announcements = data.meta.first ? data
                    : $scope.announcements.concat(data);
                $scope.loading = !data.meta.last;
                $scope.total = data.meta.total_elements;
            }, function(response) {
                //TODO 这里是加载不成功
            });
        });

        $scope.getItems = function(inview) {
            if (!inview) {
                return;
            }
            Restangular.all("announcement").getList({
                page: nowPage++
            }).then(
                function(data) {
                    $scope.announcements = data.meta.first ? data
                        : $scope.announcements.concat(data);
                    $scope.loading = !data.meta.last;
                    $scope.total = data.meta.total_elements;
                }, function(response) {
                    //TODO 这里是加载不成功
                });
        };

        $scope.publish = function(){
            supersonic.ui.layers.push("yitao#publish");
        }

    });