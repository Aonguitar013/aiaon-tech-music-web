const fs = require('fs');
const path = require('path');
const os = require('os');

const brainDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain', '35604571-c2fd-4851-b52a-407b35693f3c');
const destDir = path.join(__dirname, '..', 'public', 'images', 'mockups');

// Make sure destination folder exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find and copy generated cover images
const files = fs.readdirSync(brainDir);
const targets = {
  'bass_boss_cover': 'bass_boss_cover.png',
  'beat_master_cover': 'beat_master_cover.png',
  'indie_folk_guitar_cover': 'indie_folk_guitar_cover.png',
  'gemini_tts_cover': 'gemini_tts_cover.png',
  'nodejs_cover': 'nodejs_cover.png',
  'react_native_cover': 'react_native_cover.png',
  'uiux_design_cover': 'uiux_design_cover.png',
  'postgresql_cover': 'postgresql_cover.png',
  'docker_cover': 'docker_cover.png',
  'graphql_cover': 'graphql_cover.png',
  'security_cover': 'security_cover.png',
  'redux_cover': 'redux_cover.png',
  'angular_react_cover': 'angular_react_cover.png',
  'vue_cover': 'vue_cover.png',
  'serverless_cover': 'serverless_cover.png',
  'system_design_cover': 'system_design_cover.png',
  'testing_cover': 'testing_cover.png'
};

files.forEach(file => {
  for (const [key, destName] of Object.entries(targets)) {
    if (file.startsWith(key) && file.endsWith('.png')) {
      const srcPath = path.join(brainDir, file);
      const destPath = path.join(destDir, destName);
      console.log(`Copying ${file} -> ${destName}...`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
});

console.log('Successfully copied all generated cover images to public/images/mockups!');
