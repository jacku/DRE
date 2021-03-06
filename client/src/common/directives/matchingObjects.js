angular.module('directives.matchingObjects', [])

.directive('singleEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr><td class='col-md-12'>{{inputValue}}</td><!--td class='col-md-4 text-left'></td--></tr>",
            link: function(scope, element, attrs) {}
        };
    }
])
.directive('singlesmallEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><b>{{inputTitle}}</b></th><th class='col-md-12'></th></tr></thead>" +
                "<tr><td class='col-md-12'>{{inputValue}}</td><!--td class='col-md-4 text-left'></td--></tr>",
            link: function(scope, element, attrs) {}
        };
    }
])
.directive('multisingleEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr ng-repeat='item in inputValue'><td class='col-md-12'>{{item}}</td><!--td class='col-md-4 text-left'></td--></tr>"+
                "</table>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('physicalquantityEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr><td class='col-md-12'>{{inputValue.value}}&nbsp;{{inputValue.unit}}</td></tr></table>",
            link: function(scope, element, attrs) {}
        };
    }
])
.directive('phoneEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr ng-repeat='phone in inputValue'><td class='col-md-8'>{{phone.number}}</td><td class='col-md-4 text-left'>{{phone.type}}</td></tr>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('emailEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></div></th></tr></thead>" +
                "<tr ng-repeat='email in inputValue'><td class='col-md-12'>{{email.address}}</td></tr>",
            link: function(scope, element, attrs) {}
        };
    }
])
.directive('nameEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr><td class='col-md-12'>{{inputValue.first}} {{inputValue.middle.join(' ')}} {{inputValue.last}}</td></tr>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('addressEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr ng-repeat='line in inputValue.street_lines'><td class='col-md-12'>{{line}}</td></tr>" +
                "<tr><td class='col-md-12'>{{inputValue.city}}, {{inputValue.state}} {{inputValue.zip}}</td></tr>"+
                "<tr ng-show='inputValue.country'><td class='col-md-12'>{{inputValue.country}}</td></tr></table>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('addressesEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<table class='table table-condensed' ng-repeat='address in inputValue'>" +
                "<thead><tr><th><h4>Address</h4></th><th class='col-md-12'></th></tr></thead>" +
                "<tr ng-show='address.use'><td class='col-md-12'>({{address.use}})</td></tr>" +
                "<tr ng-repeat='line in address.street_lines'><td class='col-md-12'>{{line}}</td></tr>" +
                "<tr><td class='col-md-12'>{{address.city}}, {{address.state}} {{address.zip}}</td></tr>"+
                "<tr ng-show='address.country'><td class='col-md-12'>{{address.country}}</td></tr></table>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('orgEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><div ng-repeat='org in inputValue'><h4> {{inputTitle}} </h4>" +
                "<div ng-repeat='name in org.name'><div single-entry input-value='name' input-title='Name' ></div></div>"+
                "<div addresses-entry input-value='org.address' input-title='Address' ></div>"+
                "<div phone-entry input-value='org.phone' input-title='Phone' ></div>"+
                "</div></div>",
            link: function(scope, element, attrs) {}
        };
    }
])


.directive('performerEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> {{inputTitle}} </h4>" +
                "<div addresses-entry input-value='inputValue.address' input-title='Address'  ></div>"+
                "<div phone-entry input-value='inputValue.phone' input-title='Phone' ></div>"+
                "<div org-entry input-value='inputValue.organization' input-title='Organization' ></div>"+
                "<div coded-entry input-value='inputValue.code' input-title='Code' ng-show='inputValue.code'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])


.directive('wrappedperformerperformerEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> {{inputTitle}} </h4>" +
                "<div addresses-entry input-value='inputValue.performer.address' input-title='Address'  ></div>"+
                "<div phone-entry input-value='inputValue.performer.phone' input-title='Phone' ></div>"+
                "<div org-entry input-value='inputValue.performer.organization' input-title='Organization' ></div>"+
                "<div coded-entry input-value='inputValue.performer.code' input-title='Code' ng-show='inputValue.performer.code'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('performersEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><div ng-repeat='perf in inputValue'><h4> Performer </h4>" +
                "<div addresses-entry input-value='perf.address' input-title='Address'></div>"+
                "<div phone-entry input-value='perf.phone' input-title='Phone'></div>"+
                "<div org-entry input-value='perf.organization' input-title='Organization' ></div>"+
                "<div multicoded-entry input-value='perf.code' input-title='Code' ></div>"+
                "</div></div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//administration for immunization
.directive('administrationEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4>{{inputTitle}}</h4>" +
                "<div coded-entry input-value='inputValue.route' input-title='Route' ></div>"+
                "<div physicalquantity-entry input-value='inputValue.dose' input-title='Dose' ></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//instructions for immunization
.directive('instructionsEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4>{{inputTitle}}</h4>" +
                "<div coded-entry input-value='inputValue.code' input-title='Code' ></div>"+
                "<div single-entry input-value='inputValue.free_text' input-title='Free Text' ></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])
//languages for demographics
.directive('languagesEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4>Languages</h4><table class='table table-condensed' ng-repeat='lang in inputValue'" +
                "<thead><tr><th><b>{{lang.language | bb_language}}</b></th><th class='col-md-12'></th></tr></thead>" +
                "<tr ><td class='col-md-12'>{{lang.mode}}</td></tr>" +
                "<tr ><td class='col-md-12'>Proficiency: {{lang.proficiency}}</td></tr>" +
                "<tr ng-show='lang.preferred'><td class='col-md-12'>Preferred</td></tr>" +
                "</table></div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//guardians for demographics
.directive('guardiansEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div ><div ng-repeat='guardian in inputValue'>" +
                "<h4>Guardians</h4>" +
                "<table class='table table-condensed' ng-repeat='name in guardian.names'>" +
                "<thead><tr><th><b>Name</b></th><th class='col-md-12'></th></tr></thead>" +
                "<tr><td class='col-md-12'>{{name.first}} {{name.middle.join(' ')}} {{name.last}}</td></tr></table>" +

            "<table class='table table-condensed' ng-repeat='phone in guardian.phone'>" +
                "<thead><tr><th><b>Phone</b></th><th class='col-md-12'></th></tr></thead>" +
                "<tr><td class='col-md-8'>{{phone.number}}</td><td class='col-md-4 text-left'>{{phone.type}}</td></tr></table>" +

            "<table class='table table-condensed' ng-repeat='address in guardian.addresses'>" +
                "<thead><tr><th><b>Address</b></th><th class='col-md-12'></th></tr></thead>" +
                "<tr ng-repeat='line in address.street_lines'><td class='col-md-12'>{{line}}</td></tr>" +
                "<tr><td class='col-md-12'>{{address.city}}, {{address.state}} {{address.zip}}</td></tr></table>" +

            "</div></div>",
            link: function(scope, element, attrs) {}
        };
    }
])
    .directive('dateEntry', ['$parse',
        function($parse) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    inputValue: '=',
                    inputTitle: '@',
                    selectField: '='
                },
                template: "<table class='table table-condensed'>" +
                    "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12'></th></tr></thead>" +
                //"<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue[0].displayDate}}</td></tr>" +
                    "<tr ng-show='inputValue.point'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.point.date | date:'medium'}}</td></tr>" +
                    "<tr ng-show='inputValue.low && !inputValue.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.low.date | date:'medium'}} - PRESENT</td></tr>" +
                    "<tr ng-show='!inputValue.low && inputValue.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>... - {{inputValue.high.date | date:'medium'}}</td></tr>" +
                    "<tr ng-show='inputValue.low && inputValue.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.low.date | date:'medium'}} - {{inputValue.high.date | date:'medium'}}</td></tr>" +
                    "</table>",
                link: function(scope, element, attrs) {

                }
            };
        }
    ])


.directive('productEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div><table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.product.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.product.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.product.code_system_name}}</td></tr>" +
                "</table>" +
                "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>Manufacturer</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-12'><label style='text-transform: capitalize;'>{{inputValue.manufacturer}}</label></td></tr></table>" +
                "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>Lot Number</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-12'><label style='text-transform: capitalize;'>{{inputValue.lot_number}}</label></td></tr>" +
                "</table></div>",
            link: function(scope, element, attrs) {}
        };
    }
])


/* compact version draft
.directive('codedEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'>{{inputValue.name}}</th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code (System):</label></td><td class='col-md-4 text-left'>{{inputValue.code}} ({{inputValue.code_system_name}})</td></tr>" +
                "</table>",
            link: function(scope, element, attrs) {}
        };
    }
])
*/

.directive('codedEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.code_system_name}}</td></tr>" +
                "</table>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('wrappedcodecodedEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.code.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.code.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.code.code_system_name}}</td></tr>" +
                "</table>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('wrappedvaluecodedEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.value.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.value.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.value.code_system_name}}</td></tr>" +
                "</table>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('multicodedEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<table class='table table-condensed' ng-repeat='code in inputValue'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{code.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{code.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{code.code_system_name}}</td></tr>" +
                "</table>",
            link: function(scope, element, attrs) {}
        };
    }
])

//encounter for encounters
.directive('encounterEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div><table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.code_system_name}}</td></tr></table>" +
                "<table class='table table-condensed' ng-repeat='tran in inputValue.translations'>" +
                "<thead><tr><th><b>Translation</b></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{tran.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{tran.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{tran.code_system_name}}</td></tr>" +
                "</table></div",
            link: function(scope, element, attrs) {}
        };
    }
])


//locations for encounters
.directive('encounterlocationsEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div><h4>{{inputTitle}}</h4><div ng-repeat='loc in inputValue'>"+
                "<div single-entry inputValue='inputValue.name' inputTitle='Name'>" +
                "<div coded-entry inputValue='inputValue.location_type' inputTitle='Location Type'>" +
                "<div addresses-entry inputValue='inputValue.address' inputTitle='Address'>" +

                "</div></div>",
            link: function(scope, element, attrs) {}
        };
    }
])


//finding for encounter
.directive('findingEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div>"+

                "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>{{inputTitle}}</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.value.name}}</td></tr>" +
                "<tr ng-show='inputValue.value.code && inputValue.value.code_system_name'><td class='col-md-4'><label style='text-transform: capitalize;'>Code (System):</label></td><td class='col-md-4 text-left'>{{inputValue.value.code}} ({{inputValue.value.code_system_name}})</td></tr>" +
                "</table>" +

                "<table class='table table-condensed' ng-show='inputValue.date_time'>" +
                "<thead><tr><th><b>Effective</b></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr ng-show='inputValue.date_time.low && inputValue.date_time.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.date_time.low.date | date:'medium'}} - {{inputValue.date_time.high.date | date:'medium'}}</td></tr>" +
                "<tr ng-show='inputValue.date_time.low && !inputValue.date_time.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.date_time.low.date | date:'medium'}} - PRESENT</td></tr>" +
                "<tr ng-show='!inputValue.date_time.low && inputValue.date_time.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>... - {{inputValue.date_time.high.date | date:'medium'}}</td></tr>" +
                "</table> <br/>" +
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//administration for medications
//TODO: need interval support
.directive('medsadministrationEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div><h4>{{inputTitle}}</h4>"+
                "<div coded-entry input-value='inputValue.route' input-title='Route' select-field='selectedItems.route'></div>"+
                "<div coded-entry input-value='inputValue.form' input-title='Form' select-field='selectedItems.form'></div>"+
                "<div physicalquantity-entry input-value='inputValue.dose' input-title='Dose' select-field='selectedItems.dose'></div>"+
                "<div physicalquantity-entry input-value='inputValue.rate' input-title='Rate' select-field='selectedItems.rate'></div>"+
                "</div>",
            //templateUrl: "templates/matching/reconciliation/review/templates/sub/medsadministration.tpl.html",
            link: function(scope, element, attrs) {}
        };
    }
])

//product for medications
.directive('medsproductEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div><h4>{{inputTitle}}</h4>"+
                "<div coded-entry input-value='inputValue.product' input-title='Name'></div>"+
                "<div ng-repeat='translation in inputValue.product.translations'>"+
                "<div coded-entry input-value='translation' input-title='Translation'></div>"+
                "</div>"+
                "<div single-entry input-value='inputValue.unencoded_name' input-title='Unencoded Name'></div>"+
                "<div single-entry input-value='inputValue.manufacturer' input-title='Manufacturer'></div>"+
                "</div>",
            //templateUrl: "templates/matching/reconciliation/review/templates/sub/medsadministration.tpl.html",
            link: function(scope, element, attrs) {}
        };
    }
])


//supply for medications
.directive('medssupplyEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> {{inputTitle}} </h4>" +
                "<div date-entry input-value='inputValue.date_time' input-title='Date'  ></div>"+
                "<div name-entry input-value='inputValue.author.name' input-title='Author' ></div>"+
                "<div single-entry input-value='inputValue.repeatNumber' input-title='Repeat Number' ></div>"+
                "<div single-entry input-value='inputValue.quantity' input-title='Quantity'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//indication for medications
.directive('medsindicationEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> {{inputTitle}} </h4>" +
                "<div date-entry input-value='inputValue.date_time' input-title='Date'  ></div>"+
                "<div coded-entry input-value='inputValue.code' input-title='Code' ></div>"+
                "<div coded-entry input-value='inputValue.value' input-title='Value' ></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//problem for problems
.directive('problemEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div>"+
                "<div coded-entry input-value='inputValue.code' input-title='Problem'></div>"+
                "<div date-entry input-value='inputValue.date_time' input-title='Date'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//problem_status for problems
.directive('problemstatusEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div>"+
                "<div single-entry input-value='inputValue.name' input-title='Status'></div>"+
                "<div date-entry input-value='inputValue.date_time' input-title='Date'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

//severity for allergies
.directive('severityEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div><table class='table table-condensed'>" +
                "<thead><tr><th><h4>Severity</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.code.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.code.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.code.code_system_name}}</td></tr></table>" +
                "<table class='table table-condensed'><thead><tr><th><b>Interpretation</b></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.interpretation.name}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.interpretation.code}}</td></tr>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.interpretation.code_system_name  | bb_trunc}}</td></tr>" +
                "</table></div>",
            link: function(scope, element, attrs) {}
        };
    }
])


//reaction for allergies
.directive('reactionEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                selectField: "="
            },
            template: "<div>"+
                "<table class='table table-condensed'>" +
                "<thead><tr><th><h4>Reaction</h4></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.reaction.name}}</td></tr>" +
                "<tr ng-show='inputValue.reaction.code && inputValue.reaction.code_system_name'><td class='col-md-4'><label style='text-transform: capitalize;'>Code (System):</label></td><td class='col-md-4 text-left'>{{inputValue.reaction.code}} ({{inputValue.reaction.code_system_name}})</td></tr>" +
                "</table>" +

                "<table class='table table-condensed'>" +
                "<thead><tr><th><b>Effective</b></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr ng-show='inputValue.date_time.low && inputValue.date_time.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.date_time.low.date | date:'medium'}} - {{inputValue.date_time.high.date | date:'medium'}}</td></tr>" +
                "<tr ng-show='inputValue.date_time.low && !inputValue.date_time.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>{{inputValue.date_time.low.date | date:'medium'}} - PRESENT</td></tr>" +
                "<tr ng-show='!inputValue.date_time.low && inputValue.date_time.high'><td class='col-md-4'><label style='text-transform: capitalize;'>Date:</label></td><td class='col-md-4 text-left'>... - {{inputValue.date_time.high.date | date:'medium'}}</td></tr>" +
                "</table>" +

                "<table class='table table-condensed'>" +
                "<thead><tr><th><b>Severity</b></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                "<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.severity.code.name}}</td></tr>" +
                "<tr ng-show='inputValue.severity.code && inputValue.severity.code_system_name'><td class='col-md-4'><label style='text-transform: capitalize;'>Code (System):</label></td><td class='col-md-4 text-left'>{{inputValue.severity.code}} ({{inputValue.severity.code_system_name}})</td></tr>" +
                "</table>" +

                //"<table class='table table-condensed'><thead><tr><th><b>Interpretation</b></th><th class='col-md-12' style='text-transform: capitalize;'></th></tr></thead>" +
                //"<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Name:</label></td><td class='col-md-4 text-left'>{{inputValue.severity.interpretation.name}}</td></tr>" +
                //"<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code:</label></td><td class='col-md-4 text-left'>{{inputValue.severity.interpretation.code}}</td></tr>" +
                //"<tr><td class='col-md-4'><label style='text-transform: capitalize;'>Code System:</label></td><td class='col-md-4 text-left'>{{inputValue.severity.interpretation.code_system_name | bb_trunc}}</td></tr>" +
                //"</table>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])



//result for results
.directive('resultEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                inputAdditional: '=',
                el: '=',
                selectField: "="
            },
            /*
            template: "<div>"+
                "<div coded-entry input-value='inputValue.result' input-title='Result'></div>"+
                "<div date-entry input-value='inputValue.date_time' input-title='Date'></div>"+
                "<div single-entry input-value='inputValue.status' input-title='Status'></div>"+
                "<div single-entry input-value='inputValue.interpretation' input-title='Interpretation'></div>"+
                "<div single-entry input-value='inputValue.value' input-title='Value'></div>"+
                "<div single-entry input-value='inputValue.unit' input-title='Unit'></div>"+
                "<div single-entry input-value='inputValue.reference_range.range' input-title='Reference Range'></div>"+

                "</div>",
            */
            //templateUrl: "templates/matching/reconciliation/review/templates/sub/medsadministration.tpl.html",
            templateUrl: "templates/matching/reconciliation/review/templates/sub/result.tpl.html",
            link: function(scope, element, attrs) {}
        };
    }
])



.directive('policyEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> Insurance </h4>" +
                "<div multisingle-entry input-value='inputValue.insurance.performer.organization[0].name' input-title='Name' ></div>"+
                "<div addresses-entry input-value='inputValue.insurance.performer.organization[0].address' input-title='Address'  ></div>"+
                //"<div phone-entry input-value='inputValue.phone' input-title='Phone' ></div>"+
                //"<div org-entry input-value='inputValue.organization' input-title='Organization' ></div>"+
                //"<div coded-entry input-value='inputValue.code' input-title='Code' ng-show='inputValue.code'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

.directive('policyholderEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> Policy Holder </h4>" +
                "<div single-entry input-value='inputValue.performer.identifiers[0].identifier' input-title='Plan ID'  ></div>"+
                //"<div phone-entry input-value='inputValue.phone' input-title='Phone' ></div>"+
                //"<div org-entry input-value='inputValue.organization' input-title='Organization' ></div>"+
                //"<div coded-entry input-value='inputValue.code' input-title='Code' ng-show='inputValue.code'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])
.directive('participantEntry', ['$parse',
    function($parse) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                inputValue: '=',
                inputTitle: '@',
                selectField: '='
            },
            template: "<div><h4> Insured </h4>" +
                "<div singlesmall-entry input-value='inputValue.performer.identifiers[0].identifier' input-title='Plan ID'  ></div>"+
                "<div date-entry input-value='inputValue.date_time' input-title='' ng-show='inputValue.date_time'></div>"+
                "</div>",
            link: function(scope, element, attrs) {}
        };
    }
])

/*
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
          Header
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>


    <div class="panel panel-default" id="accordion">
        <div class="panel-heading">
            <a data-toggle="collapse" data-parent="#accordion" data-target="#blah">
                <div class="panel-title" style="cursor:pointer;">
                    <span style="text-transform:uppercase;">name</span>
                </div>
            </a>
        </div>
        <div id="blah" class="panel-collapse collapse">
            <div class="panel-body">
                <div id="myTabContent" >

                    Content Here
                </div>
            </div>
        </div>
    </div>
*/


.directive('reviewNew', ['$parse',
    function($parse) {
        return {
            restrict: 'E',
            scope: {
                val: '=',
                title: '@'
            },
            replace: true,
            link: function(scope, element, attrs) {

                var entryType = function(input) {
                    var response = 'str';
                    if (angular.isObject(input)) {
                        response = 'obj';
                    }
                    if (angular.isArray(input)) {
                        response = 'arr';
                    }
                    return response;
                };

                if (entryType(scope.val) === 'str') {
                    var append_string = "<table class='table table-condensed table-hover'>" +
                        "<thead><tr><th class='col-md-2'></th><th style='text-transform: capitalize'>" + scope.title + "</th></tr></thead>" +
                        "<tr><td><input type='checkbox' value=''></td><td>" + scope.val + "</td></tr></table>";
                    element.append(append_string);
                }

                if (entryType(scope.val) === 'obj') {

                    var append_object = "<table class='table table-condensed table-hover'>" +
                        "<thead><tr><th class='col-md-2'><input type='checkbox' value=''></th><th style='text-transform: capitalize'>" +
                        scope.title + "</th></tr></thead>";

                    for (var i in scope.val) {

                        var append_obj_item = "<tr><td><input type='checkbox' value=''>" +
                            "</td><td><label style='text-transform: capitalize'>" + i + ":</label>  " + scope.val[i] + "</td></tr>";

                        append_object = append_object + append_obj_item;

                    }

                    append_object = append_object + "</table>";

                    element.append(append_object);

                }






                //console.log(element);

                //console.log(scope.val);

                // for (var i in scope.val) {

                //console.log(scope.val[i]);

                /*if (entryType(scope.val[i]) === 'str') {

                console.log(scope.val);        
                    
                    var append_string = "<table class='table table-condensed table-hover'>" + 
                                        "<thead><tr><th class='col-md-2'></th><th style='text-transform: capitalize'>" + scope.title + "</th></tr></thead>" + 
                                        "<tr><td><input type='checkbox' value=''></td><td>" + scope.val[i] + "</td></tr></table>";

                    element.append(append_string);

                }*/
                //  }

            }
        };
    }
]);
