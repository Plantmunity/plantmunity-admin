import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../../app/hooks/useUser";
import { navigate } from "gatsby";
import { RingLoader } from "react-spinners";

const Welcome = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, isSuccess } = useUser();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUser();
      if (isSuccess) {
        navigate("/admin");
      }
    }, 3000);
  }, [isSuccess]);

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
