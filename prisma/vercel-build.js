const { spawnSync } = require('child_process');

// Run Prisma schema generation during the build process
spawnSync('npx', ['prisma', 'generate'], { stdio: 'inherit' });

// Start your Next.js application
require('next');
