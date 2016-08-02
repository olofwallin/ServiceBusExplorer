angular.
    module('core.queue').
    factory('Queue', ['$resource', 
        function($resource) {
            return $resource('queues/:queueId.json', {}, {
                query: {
                    method: 'GET',
                    params: {queueId: 'queues'},
                    isArray: true
                }
            });
        }
    ]);