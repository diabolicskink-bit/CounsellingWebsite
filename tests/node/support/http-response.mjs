export function createResponse() {
  const result = {
    body: undefined,
    ended: false,
    headers: {},
    statusCode: 200,
  };

  const response = {
    end() {
      result.ended = true;
      return result;
    },
    json(body) {
      result.body = body;
      return result;
    },
    send(body) {
      result.body = body;
      return result;
    },
    setHeader(name, value) {
      result.headers[name.toLowerCase()] = value;
    },
    status(statusCode) {
      result.statusCode = statusCode;
      return response;
    },
  };

  return { response, result };
}
