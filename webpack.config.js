const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, 'node_modules/bootstrap/dist/css'),
          // Agrega cualquier otra ruta necesaria para cargar archivos CSS
        ],
      },
    ],
  },
};
