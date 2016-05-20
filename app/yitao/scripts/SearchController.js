/**
 * Created by m2mbob on 16/5/20.
 */
angular
    .module('yitao')
    .controller('SearchController', function($scope, supersonic, Restangular, localStorageService, BaseUrl){

        var nowPage = 0;
        $scope.BaseUrl = BaseUrl;
        $scope.showHistory = true;
        $scope.histories = [];
        $scope.items = [];

        supersonic.ui.views.current.whenVisible(function() {
            $scope.histories = angular.copy(localStorageService.get('histories'));
            if($scope.histories == null){
                $scope.showHistory = false;
                $scope.histories = [];
            }
        });

        $scope.search = function(tmp){
            if(tmp == null || tmp == "" || typeof(tmp) == "undefined"){
                if($scope.keyword == null || $scope.keyword == ""){
                    supersonic.ui.dialog.alert("输入不能为空");
                    return;
                }
                else{
                    tmp = $scope.keyword;
                }
            }else{
                $scope.keyword = tmp;
            }
            supersonic.logger.log(tmp);
            $scope.histories.push(tmp);
            localStorageService.set('histories', $scope.histories);
            Restangular.one('search', tmp).getList().then(function(items){
                $scope.showHistory = false;
                $scope.items =items;
            })
        }

        $scope.clearHistory = function(){
            supersonic.ui.dialog.confirm("确认要删除所有历史记录？", {
                buttonLabels : [ "确认", "取消" ]
            }).then(function(choose) {
                if(choose == 0){
                    localStorageService.remove('histories');
                    $scope.histories = [];
                    supersonic.logger.log($scope.histories); //又要输出一下才起效
                }
            });
        }

        $scope.getHistory = function(){
            $scope.showHistory = true;
        }

        $scope.toDetail = function(id) {
            supersonic.ui.layers.push("yitao#detail?id="+ id);
        }

        $scope.getItems = function(inview) {
            supersonic.logger.log(inview);
            if (!inview || $scope.keyword == null || $scope.keyword == "" || typeof($scope.keyword) == "undefined") {
                return;
            }
            Restangular.one('search', $scope.keyword).getList(undefined, {
                page : nowPage++,
            }, undefined).then(
                function(data) {
                    $scope.items = data.meta.first ? data
                        : $scope.items.concat(data);
                    $scope.loading = !data.meta.last;
                }, function(response) {
//							$scope.loading = false;
                    //TODO 这里是加载不成功
                });
        };
    })