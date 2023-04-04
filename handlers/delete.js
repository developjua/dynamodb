const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

module.exports.deleteBlogById = async (event) => {
  const { queryStringParameters } = event;
  const blogId = queryStringParameters.blogId

  const params = {
      TableName: 'BlogsTable',
     Key: { id: { N: blogId } },
  };
  await client.send(new DeleteItemCommand(params));

  return { statusCode: 200, body: JSON.stringify({ message: "Blog post deleted successfully" }) };
};


