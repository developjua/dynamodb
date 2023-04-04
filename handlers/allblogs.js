const dynamodbClient = require('../database/dynamo')
const {ScanCommand} = require('@aws-sdk/client-dynamodb')



module.exports.getAllBlog = async (event) => {

      try {

        const { Items } = await dynamodbClient.send(new ScanCommand({ TableName: "BlogsTable" }));
        console.log(Items)
          if(!Items) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                  message: 'there is no items',
                })
          }}else{
            return {
                statusCode: 200,
                body: JSON.stringify({
                  message: 'Blog retrieved successfully',
                  data: Items
                })
          }
        
    
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