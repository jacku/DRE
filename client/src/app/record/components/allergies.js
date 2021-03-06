/*=======================================================================
Copyright 2013 Amida Technology Solutions (http://amida-tech.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
======================================================================*/

angular.module('dre.record.allergies', [])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/record/allergies', {
      templateUrl: 'templates/record/components/allergies.tpl.html',
      controller: 'recordsCtrl'
    });
  }
])

.controller('allergiesCtrl', ['$scope', '$http', '$location', 'recordFunctions',
    function($scope, $http, $location, recordFunctions) {

        $scope.entries = [];
        $scope.display = false;

        recordFunctions.getEntries($scope, "allergies");

  }
]);