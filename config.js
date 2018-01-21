exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/wound-bwat-tracker-client';
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ||
                      global.CLIENT_ORIGIN ||
                      'netlify://localhost/wound-bwat-tracker-client'
