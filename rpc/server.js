// const WorkerNode = require('./workernode.js').WorkerNode;
const fs = require('fs');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = __dirname + '/protos/def.proto';
const LOG_PATH = __dirname + '/srv.log';
const PORT = 4000;

function doTask(call, callback) {
  log(` message has been received ${JSON.stringify(call.request)}`);
  const fn = call.request.fn;
  log('fn ' + fn);
  
  const result = fn(3,4);
  log(result);
  
  callback(null, {payload: result})
}


function log(message) {
  const msg = `${new Date()}: ${message}\n`;
  fs.appendFile(LOG_PATH, msg, (err)=>{
    if(err) 
      console.error('could not write to log', err);
  } )
}

function main() {

  var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
  });
  
  var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

  const shipnet = protoDescriptor.shipnet;

  

  const createServer =()=>{
    const server = new grpc.Server();
    server.addService(shipnet.WorkerNode.service, {
      doTask
    });
    return server;
  }
  
  

  const server = createServer();
  const urlToBind = `0.0.0.0:${PORT}`;
  console.log(server, urlToBind)
  
  server.bindAsync(urlToBind, 
  grpc.ServerCredentials.createInsecure(), () => {
      try {
        server.start();
        log('rpc server running on ' + PORT)
        console.log('rpc server running on', PORT)
      } catch (e) {
        log('somthn fcked when starting server');
        log(e);
      }
  });
  
  
  
}


main();