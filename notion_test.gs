function notion({date,location,price}) {

  const url = 'https://api.notion.com/v1/pages';
  const notion_token = PropertiesService.getScriptProperties().getProperty('NOTION_TOKEN');
  const database_id = PropertiesService.getScriptProperties().getProperty('DATABASE_ID');
  const headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + notion_token,
    'Notion-Version': '2021-05-13',
  };

  const post_data = {
    'parent': {'database_id': database_id},
    'properties': {
      'Date': {
        'title': [
          {
            'text': {
              'content': date,
            }
          }
        ]
      },
      'Location': {
          'rich_text':[
            {
              'text':{
                'content': location,
              }
            }
          ]
      },
      'Price': {
          'number': Number(price.replaceAll(',','')),
      },
    }
  };

  const options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(post_data)
  };

  return UrlFetchApp.fetch(url, options);  
}
