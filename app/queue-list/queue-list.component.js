'use strict';

angular.
    module('queueList').
    component('queueList', {
        templateUrl: 'queue-list/queue-list.template.html',
        controller: ['$http', function QueueListController($http) {
            var self = this;
            console.log('fetching queues');
            self.tagline = 'These are the queues fetched from server';
            $http.get('/api/queues').then(function(response) {
                self.queues = response.data;
            });
        }]
    });