import { useDispatch } from "react-redux";
import { useLazyGetUserQuery } from "../../app/services/accountApi";
import { setPersonalDetails } from "../../app/persist/account/userSlice";
import { useEffect, useState } from "react";

//Hook function for setting the account static detail in the redux, which will be persist and revoked during logout
export default function useUser() {
  const dispatch = useDispatch(); //for using the function in in userSlice[redux]

  const [count, setCount] = useState(0); // State, which will help in treggering the getUser/useLazyGetUserQuery
  const [getUser, { data, isSuccess }] = useLazyGetUserQuery(); //destructuring the useLazyGetuserQuery and getting the, its data once loaded.

  //Once count's state change the use Effect will be triggered
  // 1. getUser() is triggered, and expecting to return a json to data
  // 2. assigning the array from the data of user to userDetail, once the error occured the data will be empty thus assigning a empty array.
  // 3. Once, user detail has been assigned with data the petOwner will have a key-value array that will suffice the parameter for the function from userSlice.
  // 4. using dispatch to use the function from userSlice called setPersonaDetail for setting the value in state in userSlice using dispatch.
  useEffect(() => {
    getUser();
    //console.log(data);
    const userDetail = data ? data.user : [];
    const userData = userDetail
      ? {
          id: userDetail.id,
          first_name: userDetail.first_name,
          middle_name: userDetail.middle_name,
          last_name: userDetail.last_name,
          username: userDetail.username,
          user_type: userDetail.type,
          address: userDetail.address,
          contact: userDetail.contact,
          email: userDetail.email,
          image: userDetail.profile_picture,
          bio_note: userDetail.bio_note,
          sex: userDetail.sex,
          profile_cover: userDetail.profile_cover,
          type: userDetail.type,
        }
      : {};

    //console.log(userData)

    dispatch(setPersonalDetails(userData));
  }, [count, dispatch, getUser, data]);

  const setUser = () => {
    setCount(1);
  };

  return { setUser, isSuccess };
}
