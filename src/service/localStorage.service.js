//test
const CURRENT_TEST_KEY = "current_test_key";
const TOKEN_KEY = "jwt_token";
const REFRESH_KEY = "jwt_refresh-token";
const EXPIRES_KEY = "jwt_expires";
const USERID_KEY = "user-local-id";

export function setLocalCurrentTest(currentTest) {
  localStorage.setItem(CURRENT_TEST_KEY, currentTest);
}
export function getLocalCurrentTest() {
  return localStorage.getItem(CURRENT_TEST_KEY);
}

export function setTokens({
  refreshToken,
  expiresIn = 3600,
  idToken,
  localId,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(USERID_KEY, localId);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USERID_KEY);
}

const localStorageService = {
  setLocalCurrentTest,
  getLocalCurrentTest,
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};

export default localStorageService;
