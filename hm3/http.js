const http = require('http');
console.log(process.env)
const apiKey = process.env.USERNAME;
const url = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=USD,EUR,RUB`;
console.log(apiKey)

http.get(url, (response) => {
    const {statusCode} = response;

    if (statusCode !== 200) {
        console.log('Error: ', statusCode)
        return
    }

    response.setEncoding('utf8')
    let rowDate = '';
    response.on('data', chunk => rowDate += chunk)
    response.on('end', () => {
        let parseData = JSON.parse(rowDate)
        console.log('parseData ', parseData)
    })
}).on('error', (err) => console.log('Error ', err))


