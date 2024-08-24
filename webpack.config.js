const path = require('path');

module.exports = {
    mode: 'development', // ou 'production' dependendo do seu ambiente
    entry: './src/ts/app.ts', // Certifique-se de que o caminho está correto
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Certifique-se de que a pasta dist está na raiz do projeto
    },
};