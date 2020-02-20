module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    testRegex: '(.*).e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '^src(.*)': '<rootDir>/src$1',
        '^public(.*)': '<rootDir>/public$1',
        '^helpers(.*)': '<rootDir>/src/helpers$1',
        '^@services(.*)': '<rootDir>/src/services$1',
        '^@pipes(.*)': '<rootDir>/src/pipes$1',
        '^@guards(.*)': '<rootDir>/src/guards$1',
        '^@interceptors(.*)': '<rootDir>/src/interceptors$1',
        '^@decorators(.*)': '<rootDir>/src/decorators$1',
    },
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: 'coverage',
}
