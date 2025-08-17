class HTTPError extends Error {
  constructor(message, status, statusText) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
    this.statusText = statusText;
  }
}

export async function fetcher(url, options = {}) {
  let response;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }

  // Check if the response is ok (status 200-299)
  if (!response.ok) {
    throw new HTTPError(
      `HTTP error! status: ${response.status}`,
      response.status,
      response.statusText
    );
  }

  const data = await response.json();
  return data;
}
