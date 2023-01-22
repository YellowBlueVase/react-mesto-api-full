// 401.1 Unauthorized: Login failed
// 401.2 Unauthorized: The server's configuration causes logon failure
// 401.3 Unauthorized: Not authorized due to ACL in resource
// 401.4 Unauthorized: The authorization service is rejected by the filtering program
// 401.5 Unauthorized: Authorization failure for ISAPI/CGI application

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Error401;
