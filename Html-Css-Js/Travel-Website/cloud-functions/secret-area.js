exports.handler = function (event, context, cb) {

  const secretContent = `
    <h3>Welcome to the secret area</h3>
    <p>This is an area for all our <strong>elite</strong> members.</p>
  `
  
  let body;

  if (event.body) {
    body = JSON.parse(event.body);
  }
  else {
    body = {};
  }


  if (body.password === 'javaScript') {
    cb(null, {
      statusCode: 200,
      body: secretContent
    })
  }
  else {
    cb(null, {
      statusCode: 401,
      body: 'Sorry the password is incorrect'
    })
  }

  
}