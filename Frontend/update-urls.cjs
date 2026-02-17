const fs = require('fs');
const path = require('path');

const files = [
  'src/components/ArticleCreation.jsx',
  'src/components/ArticleManagement.jsx',
  'src/components/ArticleView.jsx',
  'src/components/BubbleMap.jsx',
  'src/components/ReportsPage.jsx',
  'src/components/ReportsTab.jsx',
  'src/components/UserManagement.jsx',
  'src/Pages/AdminDashboard.jsx',
  'src/Pages/AiRecomendationForm.jsx',
  'src/Pages/BuyMaterial.jsx',
  'src/Pages/CreateForm.jsx',
  'src/Pages/CreateMaterial.jsx',
  'src/Pages/DeleteSubmittedForm.jsx',
  'src/Pages/EditMaterial.jsx',
  'src/Pages/HomeAfterLogin.jsx',
  'src/Pages/HomeMaterial.jsx',
  'src/Pages/ManagerAlertForm.jsx',
  'src/Pages/ManagerDashboard.jsx',
  'src/Pages/ManagerResponses.jsx',
  'src/Pages/MyInquiries.jsx',
  'src/Pages/MyInquiriez.jsx',
  'src/Pages/ShowMaterial.jsx',
  'src/Pages/UpdateAlerts.jsx',
  'src/Pages/UpdateSubmittedForm.jsx',
  'src/Pages/UserProfile.jsx',
  'src/services/reportService.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not exists
    if (!content.includes("import API_BASE_URL from")) {
      const importMatch = content.match(/^(import .+;\n)+/m);
      if (importMatch) {
        const lastImport = importMatch[0];
        content = content.replace(lastImport, lastImport + "import API_BASE_URL from '../config/api';\n");
      }
    }
    
    // Replace all localhost URLs
    content = content.replace(/['"]http:\/\/localhost:5557/g, '`${API_BASE_URL}');
    content = content.replace(/['"]https?:\/\/localhost:5557/g, '`${API_BASE_URL}');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

console.log('All files updated!');
