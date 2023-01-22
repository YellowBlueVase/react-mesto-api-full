// 404 Not Found
// The WEB server could not find the file or script you requested.
// Please check the URL to make sure the path is correct.
// If the problem persists, contact your server's administrator.

class Error404 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = Error404;
