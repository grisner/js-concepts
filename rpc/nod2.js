var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = __dirname + '/protos/def.proto';
const PORT = 4000;

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

  const workerNode = new shipnet.WorkerNode(`localhost:${PORT}`, grpc.credentials.createInsecure());
  
  /*
  const task = {
    fn: JSON.stringify(({a,b}) =>{
      return a+b
    }),
    data: JSON.stringify({a: 1,
    b: 2})
  };*/
  
  const test ={
    fn: (()=>4)
  }
  
  console.log(test)
  console.log(test.fn())
  
  const ser = JSON.stringify(test, (key, val)=>{
    return typeof val === 'function' ? '' +val : val;
  })
  
  console.log(ser)
  const des = JSON.parse(ser)
  console.log(des)
  const res = des.fn()
  console.log(res)
  
  
  const task ={
    fn: (a,b)=>{return 4},
    data:{a:4,b:5}
  }
  
  workerNode.doTask(task, (err, result)=>{
    if(err) console.error(err)
    console.log('result', result)
  })
  
}

main();
