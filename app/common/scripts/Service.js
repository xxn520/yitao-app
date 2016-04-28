angular
    .module('common')
    .constant("BaseUrl", "http://172.29.70.3:8080/")
    .constant('authStatus', {'0':'未审核', '1':'审核不通过', '2':'审核通过'})
    .config(
        function (localStorageServiceProvider, RestangularProvider, BaseUrl) {
            localStorageServiceProvider.setPrefix('me.yitao.user')
                .setNotify(true, true);
            RestangularProvider
                .setBaseUrl(BaseUrl + 'api');
            RestangularProvider.setRequestSuffix('.json');
            RestangularProvider.setRequestInterceptor(function (elem, operation) {
                if (operation === "remove") {
                    return undefined;
                }
                return elem;
            });
            RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedData = data;
                if (operation === "getList"
                    && data.content != undefined) {
                    extractedData = data.content;
                    extractedData.meta = data;
                } else {
                    extractedData = data;
                }
                return extractedData;
            });
        })
    .run(function ($rootScope, localStorageService, supersonic, Restangular) {
        var authdata = localStorageService.get("authdata");
        if (authdata) {
            Restangular.setDefaultHeaders({
                Authorization: 'Basic ' + authdata
            });
        }
    });
