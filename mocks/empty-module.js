// Mock implementation of Node.js modules
module.exports = {
  readFileSync: () => '',
  writeFileSync: () => {},
  existsSync: () => false,
  readdirSync: () => [],
  statSync: () => ({
    isDirectory: () => false,
    isFile: () => false
  }),
  createReadStream: () => null,
  createWriteStream: () => null,
  // Add other methods as needed
}; 