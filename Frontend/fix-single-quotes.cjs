const fs = require('fs');
const path = require('path');

const files = [
  'src/components/ArticleCreation.jsx',
  'src/components/ArticleManagement.jsx',
  'src/components/ArticleView.jsx',
  'src/components/UserManagement.jsx',
  'src/Pages/AdminDashboard.jsx',
  'src/Pages/HomeAfterLogin.jsx',
  'src/Pages/ManagerResponses.jsx',
  'src/services/reportService.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix mixed quotes: `${API_BASE_URL}/path' -> `${API_BASE_URL}/path`
    content = content.replace(/`\$\{API_BASE_URL\}([^`']+)'/g, '`${API_BASE_URL}$1`');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
});

console.log('All single quote errors fixed!');
