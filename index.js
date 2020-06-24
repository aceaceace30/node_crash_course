const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    let extName = path.extname(filePath)

    if (!extName) {
        extName = 'html'
        filePath = filePath + '.html'
    }

    let contentType = 'text/html'

    switch(extName) {
        case '.json':
            contentType = 'application/json'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'image/jpg'
            break
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                path404 = path.join(path.dirname(filePath), '404.html')
                fs.readFile(path404, (err, content) => {
                    res.writeHead(200, {'Content-Type': contentType})
                    res.end(content, 'utf-8')
                })
            } else {
                res.writeHead(500)
                res.end(`Server error: ${err.code}`)
            }
        } else {
            fs.readFile(filePath, (err, content) => {
                res.writeHead(200, {'Content-Type': contentType})
                res.end(content)
            })
        }
    })

    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if (req.url === '/api/users') {
    //     const users = [
    //         {'name': 'Ace', 'age': 26},
    //         {'name': 'Anj', 'age': 23}
    //     ]
    //     res.writeHead(200, {'Content-Type': 'application/json'})
    //     res.end(JSON.stringify(users))
    // }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))