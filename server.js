const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
// Use port 80 for production cloud deployment, but 3000 locally
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/instance-info', (req, res) => {
    // Get basic instance info to display which server handled the request
    const hostname = os.hostname();
    const networkInterfaces = os.networkInterfaces();
    let ip = 'Unknown';
    
    // Find a non-internal IPv4 address
    for (const name of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                ip = net.address;
                break;
            }
        }
    }
    
    res.json({ hostname, ip });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
