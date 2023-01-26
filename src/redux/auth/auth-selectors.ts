
type State  ={
  auth: {
    isLoggedIn: boolean
    user: {name: string}
  }
}

const getIsLoggedIn = (state: State) => state.auth.isLoggedIn;

const getUsername = (state: State) => state.auth.user.name;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
};
export default authSelectors;