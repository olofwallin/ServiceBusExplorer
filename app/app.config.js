'use strict';

angular.
    module('ServiceBusExplorerApp').
    config(['$locationProvider', '$routeProvider', 
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
            when('/queues', {
                template: '<queue-list></queue-list>'
            }).
            // queue messages page that will use the QueueMessageController
            when('/queues/:queueId', {
                template: 'queue details' //'<queue-detail></queue-detail>'
            }).
            otherwise('/queues');
        }
    ]);