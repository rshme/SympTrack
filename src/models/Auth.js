class AuthModel {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
  }

  setUser(userData) {
    this.user = userData;
    this.isAuthenticated = !!userData;
    return this.user;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }
}

export default new AuthModel();
