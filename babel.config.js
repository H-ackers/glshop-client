module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "49",
          "ios": "10"
        }
      }
    ]
  ],
  "plugins": [
    [
      "component", 
      {
        "libraryName": "mint-ui",  
        "style": true  
      }
    ],
    "@babel/plugin-transform-react-jsx",
    [
      "@nutui/babel-plugin-separate-import", 
      {  
        "libraryName": "@nutui/nutui-jdl",
        "libraryDirectory": "dist/packages",
        "style": "css"
      }
    ]
  ]
}
