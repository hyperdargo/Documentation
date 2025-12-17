const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.SERVER_PORT || 25587;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    
    // Handle favicon.ico requests
    if (req.url === '/favicon.ico') {
        // Return empty favicon to avoid 404
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }
    
    // Get file path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Read file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, serve index.html for SPA routing
                fs.readFile('./index.html', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 - Page Not Found</h1>');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            // Success
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`╔══════════════════════════════════════════════════════╗`);
    console.log(`║    DTEmpire Documentation Server                    ║`);
    console.log(`╠══════════════════════════════════════════════════════╣`);
    console.log(`║  Server: http://0.0.0.0:${PORT}                      ║`);
    console.log(`║  Time: ${new Date().toLocaleString()}               ║`);
    console.log(`╚══════════════════════════════════════════════════════╝`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});