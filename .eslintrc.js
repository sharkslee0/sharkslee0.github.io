module.exports = {
  parser: "@babel/eslint-parser",
  settings: {
    react: {
      version: "detect", // 자동으로 React 버전을 감지합니다.
    },
  },
  env: {
    browser: true, // 브라우저 환경을 설정합니다.
    node: true, // Node.js 환경을 설정합니다.
  },
  extends: [
    "eslint:recommended", // ESLint의 추천 설정을 사용합니다.
    "plugin:react/recommended", // React의 추천 설정을 사용합니다.
  ],
  rules: {
    "react/prop-types": "off", // React prop-types 검사를 끕니다.
  },
}
