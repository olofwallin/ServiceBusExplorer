// modules =================================================
var path = require('path');
var azure = require('azure');
//var azureStorage = require('azure-storage'); //Not used??

// azure configuration
var azureConnection = 'Endpoint=sb://egax7learn-servicebus-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=yY8WyMkFsHjakloLqhUkzJX2YzctlctrwTexTqwLf4E=';
var serviceBusService = azure.createServiceBusService(azureConnection);
var queueName = 'purchaseorderqueue';

module.exports.index = function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
}

module.exports.queues = function(req, res) {
    serviceBusService.listQueues(function(error, queues){
        if(!error){
            res.json(queues);
        }
    });
}

/*
module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        app.get('/api/queues', function(req, res) {
            serviceBusService.listQueues(function(error, queues){
                if(!error){
                    //for (var i = 0; i < queues.length; i++)
                    //{
                    //    var queue = queues[i];
                    //}
                    res.json(queues);
                }
            });
        });

        app.get('/api/queues/message', function(req, res) {
            serviceBusService.receiveQueueMessage(queueName, { isPeekLock: false }, function(error, receivedMessage){
                if(!error){
                    // Message received and deleted
                    console.log(receivedMessage);
                }
            });
        });

        // route to handle creating goes here (app.post)
        app.post('api/queue/message', function(req, res) {
            serviceBusService.sendQueueMessage(queueName, { body: 'This is a message created through node' }, function(error, createdMessage){
                if (!error)
                {
                    res.message = "Queue message created.";
                    console.log('Created message ' + createdMessage.body);
                } else {
                    res.errors['message'] = 'Something went wrong';
                }
            });
        });

        // route to handle delete goes here (app.delete)

        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname+'/index.html'));
            
        });
};
*/