const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../out/sitemap.xml');

console.log('Running SuperUtility post-build sitemap processor...');

if (fs.existsSync(sitemapPath)) {
  let content = fs.readFileSync(sitemapPath, 'utf8');
  
  // Verify it doesn't already contain sitemap.xsl to prevent duplicate insertions
  if (!content.includes('sitemap.xsl')) {
    const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
    const stylesheetInstruction = '\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
    
    // Normalise potential character encodings or spacing
    content = content.trim();
    
    if (content.startsWith(xmlDeclaration)) {
      const updatedContent = xmlDeclaration + stylesheetInstruction + '\n' + content.substring(xmlDeclaration.length).trim();
      fs.writeFileSync(sitemapPath, updatedContent, 'utf8');
      console.log('🚀 Successfully injected custom sitemap.xsl stylesheet instruction into out/sitemap.xml!');
    } else {
      // If the file doesn't start with standard declaration, try to prepend it securely
      console.warn('⚠️ Warning: sitemap.xml does not start with standard xml declaration. Prepending custom link.');
      const updatedContent = xmlDeclaration + stylesheetInstruction + '\n' + content;
      fs.writeFileSync(sitemapPath, updatedContent, 'utf8');
    }
  } else {
    console.log('✅ sitemap.xsl styling link is already present in out/sitemap.xml.');
  }
} else {
  console.error('❌ Error: out/sitemap.xml was not found! Please check if "next build" completed successfully.');
  process.exit(1);
}
