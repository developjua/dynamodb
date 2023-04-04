
const { DynamoDBClient,} = require("@aws-sdk/client-dynamodb");

const option = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: "dummy",
    secretAccessKey: "dummy",

 
  }
const dynamodbClient = new DynamoDBClient({...option,
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy"
  }});


  module.exports = dynamodbClient;