const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'app', '(public)');

const oldLogoBlockRegex = /<div className="w-\[85px\] h-\[85px\] bg-white rounded-full p-1 mx-auto mb-2\.5 shadow-\[0_4px_10px_rgba\(0,0,0,0\.15\)\] flex items-center justify-center">\s*<span className="text-\[#163a22\] font-bold text-xl">OGM<\/span>\s*<\/div>/g;

const newLogoBlock = `<div className="w-[85px] h-[85px] bg-white rounded-full p-1 mx-auto mb-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden">
              <Image src="/ogm.logo.png" alt="OGM Logo" width={85} height={85} className="object-contain" />
            </div>`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            if (oldLogoBlockRegex.test(content)) {
                // Ensure Image is imported from next/image
                if (!content.includes("import Image from 'next/image';")) {
                    // insert it after use client or at top
                    content = content.replace(/("use client";\s*)/, "$1\nimport Image from 'next/image';\n");
                }
                content = content.replace(oldLogoBlockRegex, newLogoBlock);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated logo in: ' + fullPath);
            }
        }
    }
}

processDirectory(directoryPath);
console.log('Done!');
