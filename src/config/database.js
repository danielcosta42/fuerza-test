require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: '0.0.0.0',
  port: '5433',
  username: 'postgres',
  password: 'localhost',
  database: 'stone-inbound',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
