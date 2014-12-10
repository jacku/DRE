'use strict';
/**
 * @ngdoc function
 * @name phrPrototypeApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the phrPrototypeApp
 */
angular.module('phrPrototypeApp').controller('NotesCtrl', function($scope, notes) {
    $scope.notes = [];
    $scope.filters = {
        'starred': true,
        'unStarred': false,
        'allergies': true,
        'encounters': true,
        'immunizations': true,
        'medications': true,
        'conditions': true,
        'procedures': true,
        'vitals': true,
        'results': true,
        'social': true,
        'claims': true,
        'insurance': true
    };
    $scope.toggle = function (name) {
    	$scope.filters[name] = !$scope.filters[name];
        
    };
    $scope.toggleAll = function () {
    	_.each($scope.filters, function(value, key, list) {
    		$scope.filters[key] = true;
    	});
    };

    $.lockfixed(".sidebar-control",{offset: {top: 10},forcemargin: true}});

    function getNotes() {
        notes.getNotes(function(err, returnNotes) {
            $scope.notes = [];
            $scope.notes = returnNotes;
        });
    }
    $scope.clickStar = function(starVal, starIndex, section) {
        var tmpSection = _.where($scope.notes, {
            'section': section
        });
        if (starVal) {
            tmpSection[0].notes[starIndex].note.starred = false;
        } else {
            tmpSection[0].notes[starIndex].note.starred = true;
        }
    };
    getNotes();
});