module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/variables.scss";`
            }
        }
    }
};
