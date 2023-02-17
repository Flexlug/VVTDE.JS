// write a grpc server which using grpc-js package. use a protobuf file
const grpc = require('@grpc/grpc-js');
const db = require('./db')
const protoLoader = require('@grpc/proto-loader');


// Load the protobuf
const proto = protoLoader.loadSync('./proto/vvtde.proto')
 // Create a server instance with the protobuf definition and a custom handler implementation. 
const server = new grpc.Server(); 
const serverImplementation = { 
    RequestDownloadVideo(call, callback) {
        let guid = call.request.guid
        let url = call.request.url

        db.addUrl(guid, url)
        callback( 
            null,
            {
                ok: true
            }
        )
    }
}
server.addService(proto.VVTDEBridge, serverImplementation); 

// Костыль. Нет синхронного метода bind()
(async () => {
    await server.bindAsync('localhost:50000', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    })
})()