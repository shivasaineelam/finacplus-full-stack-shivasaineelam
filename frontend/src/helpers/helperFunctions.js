export const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData;
  };
