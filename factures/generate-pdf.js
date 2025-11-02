/**
 * Script Node.js pour générer un PDF depuis le template HTML
 * 
 * Installation:
 * npm install puppeteer
 * 
 * Usage:
 * node factures/generate-pdf.js
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
    console.log('🚀 Démarrage de la génération PDF...');
    
    try {
        // Charger le HTML
        const htmlPath = path.join(__dirname, 'template-facture.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        
        // Lancer le navigateur
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Définir le contenu HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });
        
        // Générer le PDF
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true, // Important pour préserver les gradients et couleurs
            margin: {
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
            },
            preferCSSPageSize: true,
            displayHeaderFooter: false
        });
        
        // Sauvegarder le PDF
        const outputPath = path.join(__dirname, 'facture-export.pdf');
        fs.writeFileSync(outputPath, pdf);
        
        console.log(`✅ PDF généré avec succès: ${outputPath}`);
        
        await browser.close();
        
    } catch (error) {
        console.error('❌ Erreur lors de la génération:', error);
        process.exit(1);
    }
}

// Exécuter si appelé directement
generatePDF();

export { generatePDF };

