const { PutItemCommand,ScanCommand} = require("@aws-sdk/client-dynamodb");
const dynamodbClient = require('../database/dynamo')



module.exports.createBlog = async (event) => {
  const blog = JSON.parse(event.body);
  const { Items } = await dynamodbClient.send(new ScanCommand({ TableName: "BlogsTable" }));
  console.log(Items)
  const id = Items.length + 1;
  const params = {
    TableName: 'BlogsTable',
    Item: {
      'id': { N:`${id}`  },
      'title': { S: blog.title },
      'content': { S: blog.content }
    }
  };
  try {
    await dynamodbClient.send(new PutItemCommand(params));
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Blog created successfully'
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred while creating the blog'
      })
    };
  }
};