const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'app', '(public)');

const oldSvgBlock = `<svg className="absolute -bottom-5 -right-5 w-[550px] h-[800px] z-0 pointer-events-none overflow-hidden blur-[10px] opacity-25 mix-blend-multiply" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M320 800V420L295 450L275 410L250 450L220 395L190 440L150 380L110 450L70 370L20 480V800H320Z" fill="#7fa98c"/>
            <path d="M420 800V310L395 345L375 305L350 345L325 290L295 335L260 270L220 340L180 260L130 360L80 430V800H420Z" fill="#699677"/>
            <path d="M480 800V240L455 275L435 235L410 275L385 220L355 265L320 200L280 270L240 190L190 290L140 370L100 450L70 520V800H480Z" fill="#588566"/>
            <path d="M500 800V150L465 200L435 145L400 195L365 130L325 185L285 110L235 190L185 100L130 210L80 310L40 400L20 500V800H500Z" fill="#477355"/>
          </svg>`;

const newDivBlock = `<div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[url('/agac-silueti.png')] bg-no-repeat bg-bottom bg-contain opacity-20 pointer-events-none z-0" style={{ filter: 'sepia(1) hue-rotate(50deg) saturate(2)' }} />`;

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // SVG'yi bul ve değiştir (whitespace değişikliklerine karşı esnek olmak için regex kullanılabilir ama basit replace deneyelim)
    // Whitespace'leri normalize edelim
    const normalize = str => str.replace(/\s+/g, ' ');
    
    let normalizedContent = normalize(content);
    let normalizedOld = normalize(oldSvgBlock);
    
    if (normalizedContent.includes(normalizedOld)) {
        // Regex ile esnek replace yapalım
        const regex = /<svg className="absolute -bottom-5 -right-5 w-\[550px\].*?<\/svg>/s;
        content = content.replace(regex, newDivBlock);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            replaceInFile(fullPath);
        }
    }
}

processDirectory(directoryPath);
console.log('Done!');
