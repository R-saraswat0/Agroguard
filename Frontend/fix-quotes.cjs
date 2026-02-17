const fs = require('fs');
const path = require('path');

const files = [
  'src/components/BubbleMap.jsx',
  'src/components/ReportsPage.jsx',
  'src/components/ReportsTab.jsx',
  'src/Pages/AiRecomendationForm.jsx',
  'src/Pages/BuyMaterial.jsx',
  'src/Pages/CreateMaterial.jsx',
  'src/Pages/HomeMaterial.jsx',
  'src/Pages/ManagerAlertForm.jsx',
  'src/Pages/ManagerDashboard.jsx',
  'src/Pages/MyInquiries.jsx',
  'src/Pages/MyInquiriez.jsx',
  'src/Pages/UpdateAlerts.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix mixed quotes: `${API_BASE_URL}/path" -> `${API_BASE_URL}/path`
    content = content.replace(/`\$\{API_BASE_URL\}([^`"]+)"/g, '`${API_BASE_URL}$1`');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
});

console.log('All quote errors fixed!');
