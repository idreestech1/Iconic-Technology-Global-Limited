const fs = require('fs');
const path = require('path');

const url1 = '/gallery/UI%20UX%20DESIGN/Kupa%20-%20Food%20Delivery%20App%20UI%20Kit.jpeg';
const url2 = '/gallery/UI%20UX%20DESIGN/Food%20App%20Design%20-%20Sd%20Rinku%20Khan.jpeg';
const url3 = '/gallery/UI%20UX%20DESIGN/Transform%20your%20design%20workflow%20with%20our.jpeg';

[url1, url2, url3].forEach(u => {
  const decoded = decodeURIComponent(u);
  const full = path.join(__dirname, 'public', decoded.replace(/^\//, ''));
  console.log(u, '=>', decoded, 'exists:', fs.existsSync(full));
});
