
 var client = new Messaging.Client("broker.mqttdashboard.com", 8000, "myclientid_" + parseInt(Math.random() * 100, 10));


 client.onConnectionLost = function (responseObject) {
     alert("connection lost: " + responseObject.errorMessage);
 };

 client.onMessageArrived = function (message) {
     $('#messages').append('<span>Tópico: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
 };

 //Opções para a conexão
 var options = {
     timeout: 3,
     //Sucesso na conexão
     onSuccess: function () {
         alert("Conectado com sucesso");
            $("#messages").append("<h1> Conectado </h1>");
     },
     //Falha na conexão
     onFailure: function (message) {
         alert("Falha na conexão: " + message.errorMessage);
         $("#messages").append("<h1> Falha na conexão </h1>");
     }
 };

 var publish = function (payload, topic, qos) {
     //Envia mensagem
     var message = new Messaging.Message(payload);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }
