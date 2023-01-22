// 500 internal error of the server
// The WEB server cannot perform this request. Please retry this request later.
// If the problem persists, contact the administrator of your Web server.

class Error500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = Error500;
