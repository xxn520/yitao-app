/**
 * Created by m2mbob on 16/4/28.
 */
angular
    .module('yitao')
    .controller('ExploreController', function($scope, supersonic, $http, Restangular, BaseUrl, $compile) {

        var map = new BMap.Map("map");
        var icon = new BMap.Icon("/images/place.png", new BMap.Size(22, 29), {
            anchor: new BMap.Size(11, 14),
            imageSize: new BMap.Size(22, 29)
        });
        var selectedicon = new BMap.Icon("/images/place-selected.png", new BMap.Size(22, 29), {
            anchor: new BMap.Size(11, 14),
            imageSize: new BMap.Size(22, 29)
        });
        var currenticon = new BMap.Icon("/images/current-place.png", new BMap.Size(22, 29), {
            anchor: new BMap.Size(11, 14),
            imageSize: new BMap.Size(22, 29)
        });
        var currentPoint, currentBiz, currentMarker;
        var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});

        $scope.route = function(){
            if(typeof (currentBiz) === "undefined"){
                supersonic.ui.dialog.alert("请选择要前往的商家!");
                return;
            }
            walking.search(currentPoint, new BMap.Point(currentBiz.lng, currentBiz.lat));
            document.querySelector("#r-result").style.display = "block";
            document.querySelector("#r-cancel").style.display = "block";
        }

        $scope.hideRoute = function(){
            document.querySelector("#r-result").style.display = "none";
            document.querySelector("#r-cancel").style.display = "none";
        }

        supersonic.device.ready.then(function(){
            supersonic.device.geolocation.getPosition().then(function (position) {
                $http.jsonp("http://api.map.baidu.com/geoconv/v1/?callback=JSON_CALLBACK&ak=CZ9hDU2G8MGfXFxU9r9j5G1L&coords="
                    + position.coords.longitude + "," + position.coords.latitude).success(function(data, status, headers, config) {
                    currentPoint = new BMap.Point(data["result"][0].x, data["result"][0].y);
                    map.centerAndZoom(currentPoint, 15);  // 初始化地图,设置中心点坐标和地图级别
                    currentMarker = new BMap.Marker(currentPoint, {"icon" : currenticon});
                    map.addOverlay(currentMarker);
                    Restangular.all('biz').getList().then(function(bizs){
                        angular.forEach(bizs.plain(), function(data){
                            var pt, marker;
                            var getInfoWindow = function(biz){
                                document.querySelector("#r-result").style.display = "none";
                                document.querySelector("#r-cancel").style.display = "none";
                                var content = "<div class='item item-avatar'>"
                                    + "<img src='"
                                    + BaseUrl + biz.cover_photo+"'/>"
                                    + "<h3>"+biz.name+"</h3>"
                                    + "<p>"+biz.address+"</p>"
                                    + "</div>";
                                currentBiz = biz;
                                return new BMap.InfoWindow(content);
                            }
                            pt = new BMap.Point(data.lng, data.lat);
                            marker = new BMap.Marker(pt, {"icon" : icon});
                            marker.biz = data;
                            marker.addEventListener("click", function(e){
                                var p = e.target;
                                p.setIcon(selectedicon);
                                this.openInfoWindow(getInfoWindow(p.biz));
                            });
                            marker.addEventListener("infowindowclose", function(e){
                                var p = e.target;
                                currentBiz = undefined;
                                p.setIcon(icon);
                            });
                            map.addOverlay(marker);
                        });
                    });
                }).error(function(data, status, headers, config) {
                    supersonic.ui.dialog.alert("定位失败!");
                });
            });
        })

        $scope.toSearch = function(id) {
            supersonic.ui.layers.push("yitao#search");
        }

    });