const fs = require('fs')
const path = require('path')

console.log('🧪 Testing Christable MVP Setup...\n')

// Check required files
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'postcss.config.js',
  'prisma/schema.prisma',
  'app/layout.tsx',
  'app/dashboard/page.tsx',
  'components/dashboard/EventOverview.tsx',
  'lib/db.ts',
  'lib/events.ts',
  'lib/ping-engine.ts',
]

let allFilesExist = true

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - MISSING`)
    allFilesExist = false
  }
})

console.log('\n📁 Directory Structure Check:')
const directories = [
  'app/api',
  'app/dashboard',
  'app/people',
  'app/teams',
  'app/schedule',
  'app/map',
  'app/activity',
  'components/dashboard',
  'components/ui',
  'components/forms',
  'lib/sync',
  'types',
  'utils',
  'prisma'
]

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir)
  if (fs.existsSync(dirPath)) {
    console.log(`✅ ${dir}/`)
  } else {
    console.log(`❌ ${dir}/ - MISSING`)
    allFilesExist = false
  }
})

console.log('\n📦 Package.json Check:')
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
  const requiredDeps = ['next', 'react', 'react-dom', '@prisma/client', 'prisma', 'tailwindcss']
  const missingDeps = []
  
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
      missingDeps.push(dep)
    }
  })
  
  if (missingDeps.length === 0) {
    console.log('✅ All required dependencies found')
  } else {
    console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`)
    allFilesExist = false
  }
} catch (error) {
  console.log('❌ Failed to read package.json')
  allFilesExist = false
}

console.log('\n📋 Prisma Schema Check:')
try {
  const schema = fs.readFileSync(path.join(__dirname, 'prisma/schema.prisma'), 'utf8')
  const requiredModels = ['model User', 'model Team', 'model Event', 'model Ping', 'model Schedule']
  const missingModels = []
  
  requiredModels.forEach(model => {
    if (!schema.includes(model)) {
      missingModels.push(model.replace('model ', ''))
    }
  })
  
  if (missingModels.length === 0) {
    console.log('✅ All required models found')
  } else {
    console.log(`❌ Missing models: ${missingModels.join(', ')}`)
    allFilesExist = false
  }
} catch (error) {
  console.log('❌ Failed to read Prisma schema')
  allFilesExist = false
}

console.log('\n🎯 Setup Summary:')
if (allFilesExist) {
  console.log('✨ All checks passed! The MVP is ready for development.')
  console.log('\n🚀 Next steps:')
  console.log('1. Run: npm install')
  console.log('2. Set up your .env.local file')
  console.log('3. Run: npx prisma db push')
  console.log('4. Run: npm run db:seed')
  console.log('5. Run: npm run dev')
  console.log('6. Open http://localhost:3000')
} else {
  console.log('⚠️  Some checks failed. Please review the missing files/dependencies.')
  process.exit(1)
}