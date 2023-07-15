import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
setupFilesAfterEnv: [
  '@testing-library/jest-dom/extend-expect', // cf. https://stackoverflow.com/questions/62410948/why-does-jest-dom-give-the-error-typeerror-expect-not-tobevisible-is-not
  '<rootDir>/jest.setup.ts',
],
 
  testEnvironment: 'jest-environment-jsdom',
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)