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
};

module.exports.queues = function(req, res) {
    
    serviceBusService.listQueues(function(error, queues){
        console.log('API: Listing queues');
        if(!error){
            res.json(queues);
        }
    });  
};

module.exports.queue = function(req, res) {
    serviceBusService.getQueue(queueName, function(error, queue) {
        console.log('API: getting queue' + queueName);
        if(error) {
            console.log(error);
        } else {
	        res.json(queue);
        }
    });
}

module.exports.receiveQueueMessage = function(req, res) {
    
    console.log('API: showing queue message(s) for queue ' +  queueName);
    
    var queue = module.exports.queue;
    
    if (queue) {
        var noOfMessagesToReceive = queue.MessageCount < 10 ? queue.MessageCount : 10;
        var messages = [];
        for (var i = 0; i < noOfMessagesToReceive; i++) {
	        serviceBusService.receiveQueueMessage(queueName, {isPeekLock: true}, function(error, receivequeuemessageresult) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(receivequeuemessageresult);
                    messages += receivequeuemessageresult;
                }
            });    
        }
        res.json(messages);
    }   
};

module.exports.createQueueMessage = function(req, res) {
    console.log('API: Creating queue message on queue ' + queueName);
    serviceBusService.sendQueueMessage(queueName, 'Send Message Works', function(error1) {
    if (error1) {
      console.log(error1);
    } else {
      console.log('Sent first Message');
      serviceBusService.sendQueueMessage(queueName, 'Send Message Still Works', function(error2) {
        if (error2) {
          console.log(error2);
        } else {
          console.log('Sent Second Message');
        }
      });
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