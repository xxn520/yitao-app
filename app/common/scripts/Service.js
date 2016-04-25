angular
    .module('common')
    .constant("BaseUrl", "http://192.168.1.105:8080/")
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
