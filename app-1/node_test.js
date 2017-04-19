if (require.main === module) {
  const axios = require('axios');
  let token = 'cdc39c5b5ef27f52b9131b54cb700b5a';
  axios.get(`https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token=${token}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
