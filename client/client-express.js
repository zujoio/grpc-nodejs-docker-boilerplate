var PROTO_PATH = __dirname + '/hello.proto';
var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
const express = require('express')
const app = express()
const port = 3000
function main() {
  var client = new hello_proto.Greeter('grpc-server:50051', grpc.credentials.createInsecure());
  console.log(client)
  var user;
  app.get('/:id', function (req, res) {
    user = req.params.id;
    client.sayHello({name: user}, function(err, response) {
      console.log('Greeting:', response);
      res.send(response);
    });
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
main();
