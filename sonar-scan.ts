// import pkg from 'sonarqube-scanner';

// const scanner = new pkg({
//   serverUrl: 'http://localhost:9000',
//   options: {
//     'sonar.projectName': 'e-commerce-backend',
//     'sonar.projectDescription': 'branch expansion system',
//     'sonar.sources': 'src',
//     'sonar.login': 'admin',
//     'sonar.password': 'admin12345',
//     'sonar.projectKey': 'e-commerce-backend',
//     'sonar.sourceEncoding': 'UTF-8',
//     'sonar.exclusions': 'node_modules/**',
//     'sonar.tests': 'test',
//   },
// });

// scanner.run(() => process.exit());

const scanner = require('sonarqube-scanner');

const options = {
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectName': 'e-commerce-backend',
    'sonar.projectDescription': 'branch expansion system',
    'sonar.sources': 'src',
    'sonar.login': 'admin',
    'sonar.password': 'admin12345',
    'sonar.projectKey': 'e-commerce-backend',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.exclusions': 'node_modules/**',
    'sonar.tests': 'test',
  },
};

scanner(options, () => process.exit());
