(function(){
	'use strict';

	angular.module('shoppingCart.shared.controllers')
	.controller('FooterController', ['$scope','$timeout', '$localStorage','$rootScope','$state',
	function($scope, $timeout, $localStorage,$rootScope,$state) {
		


		console.log("Inside FooterController...");
		/*GlobalDataService.getHeader($scope);
		$scope.logout = function(){
			//remove auth_token from session storage and send to login page
			delete $localStorage.auth_token;
			window.location = '/';
		};

		$scope.changeLang = function(lang){
			var _lang_re = /\/[a-zA-Z0-9-]{2,5}\//;
			window.location.pathname = window.location.pathname.replace(_lang_re, '/'+lang+'/');
		};

		$timeout(function() {
			SASAPP.megaMenuBtn();
			SASAPP.searchBtn();
		},0);

		$scope.blankSearch = false;
		$scope.searchCustomer = function(){
			if (!$scope.searchTerm) {
				$scope.blankSearch = true;
			} else {
				$scope.blankSearch = false;
				$state.go('customerSearch',{'lang':$rootScope.lang, 'search':$scope.searchTerm});
			}
		}*/

	}]);

})();