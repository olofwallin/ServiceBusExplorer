angular.
    module('queueDetail').
    component('queueDetail', {
        template: 'This will show the details for queue {{$ctrl.queueId}}',
        controller: ['$routeParams', 
            function QueueDetailController($routeParams) {
                this.queueId = $routeParams.queueId;
            }
        ]
    });