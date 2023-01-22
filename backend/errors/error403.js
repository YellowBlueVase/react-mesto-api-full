// 403 Forbidden

class Error403 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Error403;
