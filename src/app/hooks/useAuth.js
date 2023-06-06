import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetCredentials } from "../persist/authentication/authSlice";
import { resetPersonalDetails } from "../persist/account/userSlice";
import { useLogoutUserMutation } from "../services/authApi";
import { navigate } from "gatsby";

export default function useAuth() {
  const auth = useSelector((state) => state.auth); //for getting the value in authSlice[redux]

  const dispatch = useDispatch(); //for using the function in in authSlice[redux]

  const [exitUser] = useLogoutUserMutation(); //using the API call for loging out and revoking user's token

  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.token); // setting a state, which depends inf the auth.token has value

  // Having value means truthy and having no value means falsy
  // '!!' transform truthy and falsey into true or falsey

  useEffect(() => {
    setIsLoggedIn(!!auth.token);
  }, [auth]);
  //changes in auth state or any values in authSlice triggers useEffect, which eventually set isLoggedIn to true.

  //function that will be used for logging out and revoking user
  const logout = () => {
    exitUser(); //revoke token
    dispatch(resetCredentials()); //reset the values of variables in authSlice
    dispatch(resetPersonalDetails()); //reset the values of variables in authSlice
    navigate("/");
  };

  return { isLoggedIn, auth, logout };
}
