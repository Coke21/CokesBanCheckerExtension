const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    popupSettings: path.join(__dirname, "src/popup/popupSettings.ts"),
    background: path.join(__dirname, "src/background.ts"),
    battleMetrics: path.join(__dirname, "src/content/battleMetrics.ts"),
    steamProfile: path.join(__dirname, "src/content/steamProfile.ts"),
    helper: path.join(__dirname, "src/helper.ts")
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.(scss|sass|css)$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
