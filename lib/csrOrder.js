var Client = require("./client");
var CSR_ORDER_PATH = "csrs";

function CsrOrder() {

}

CsrOrder.create = function(client, item, callback){
  if(arguments.length === 2){
    callback = item;
    item = client;
    client = new Client();
  }
  client.makeRequest("post", client.concatAccountPath(CSR_ORDER_PATH), {Csr: item}, function(err, item){
    if(err){
      return callback(err, null);
    }
    item.client = client;
    item.id = item.orderId;
    item.__proto__ = CsrOrder.prototype;
    callback(null, item);
   });
};

CsrOrder.get = function(client, id, callback){
  if(arguments.length === 2){
    callback = id;
    id = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatAccountPath(CSR_ORDER_PATH), null, id, function(err,res){
    if(!res){
      return callback(err);
    }
    var item = res;
    item.client = client;
    item.__proto__ = CsrOrder.prototype;
    if(err){
      return callback(err, item);
    }
    callback(null, item);
  });
};

CsrOrder.list = function(client, query, callback){
  if(arguments.length === 2){
    callback = query;
    query = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatAccountPath(CSR_ORDER_PATH), query, function(err,res){
    if(err){
      return callback(err);
    }
    callback(null, res);
  });
};


module.exports = CsrOrder;
