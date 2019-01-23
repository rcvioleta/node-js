const http = require('http');
const fs = require('fs');

const myHtml = `
<html>
<head>
    <title>From: Node Server</title>
</head>
<body>
    <h1>Enjoying Node so far?</h1>
</body>
</html>
`;

const myForm = `
<html>
<head>
    <title>Send Message</title>
</head>
<body>
    <form action="/message" method="POST">
        <input type="text" name="message"><button>Send</button>
    </form>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(myForm);
        res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);

