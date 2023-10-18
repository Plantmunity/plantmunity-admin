import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../../app/hooks/useUser";
import { navigate } from "gatsby";
import { RingLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { resetPersonalDetails } from "../../app/persist/account/userSlice";
import { resetCredentials } from "../../app/persist/authentication/authSlice";
const Welcome = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setUser, isSuccess, error } = useUser();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUser();
      if (isSuccess) {
        navigate("/home");
      }
      if (error) {
        dispatch(resetCredentials());
        dispatch(resetPersonalDetails());
        navigate("/");
      }
    }, 3000);
  }, [isSuccess, setUser]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
        //backgroundColor:'red',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid item>
        <RingLoader color="#758A7B" loading={loading} />
      </Grid>
    </Grid>
  );
};

export default Welcome;
