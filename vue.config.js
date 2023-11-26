const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "https://tasks3-757b2-default-rtdb.firebaseio.com",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/taskManager/" : "/",
});
