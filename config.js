exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/woundTracker';
exports.PORT = process.env.PORT || 1111;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ||
                      global.CLIENT_ORIGIN ||
                      'netlify://localhost/objective-neumann-540817'
                      //is this local name or netlify name?
