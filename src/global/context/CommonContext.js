const { createContext, useState, act } = require('react');

const CommonContext = createContext({});
const CommonProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loggedMember, setLoggedMember] = useState({});
  const value = {
    state: { isLogin, loggedMember },
    action: { setIsLogin, setLoggedMember },
  };

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};
const { Consumer: CommonConsumer } = CommonContext;
export { CommonProvider, CommonConsumer };
export default CommonContext;
