const { GetItemCommand } = require("@aws-sdk/client-dynamodb");
const dynamodbClient = require('../database/dynamo')



module.exports.getBlog = async (event) => {
  const { queryStringParameters } = event;
  const blogId = queryStringParameters.blogId
    const params = {
      TableName: 'BlogsTable',
      Key: {
        'id': { N: blogId }
      }
    };
    try {
      const { Item } = await dynamodbClient.send(new GetItemCommand(params));
      if (Item) {
        const blogData = {
          id: Item.id.N,
          title: Item.title.S,
          content: Item.content.S
        };
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Blog retrieved successfully',
            data: blogData
          })
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: 'Blog not found'
          })
        };
      }
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'An error occurred while retrieving the blog'
        })
      };
    }
  };