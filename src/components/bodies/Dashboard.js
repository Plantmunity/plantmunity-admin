import { Box, Divider, Grid, Stack, Toolbar, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";
import InquiryTable from "../tables/InquiryTable";
import CounterCards from "../cards/dashboard/CounterCards";

import { useGetDashboardQuery } from "../../app/services/accountApi";

//icons
import { FaUserShield } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { BsFillFilePostFill } from "react-icons/bs";
import { MdAdminPanelSettings, MdReportProblem } from "react-icons/md";
import { useSelector } from "react-redux";

const Dashboard = ({ handleGoTo }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const type = useSelector((state) => state.user.type);
  const { data } = useGetDashboardQuery(undefined, {
    refetchOnMountOrArgChange: "true",
    pollingInterval: 5000,
  });

  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Arvo",
          fontWeight: "bold",
          width: "100%",
          ml: mobile ? 0 : 3,
        }}
      >
        Dashboard
      </Typography>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>
      <Grid
        container
        direction={"row"}
        sx={{
          width: "100%",
        }}
      >
        {type === "SA" || type === "Admin" ? (
          <CounterCards
            title={"Active Users"}
            value={data?.active_users}
            cardspace={0}
            icon={
              <FaUserShield
                style={{
                  width: 60,
                  height: 60,
                  color: "#bfcba5",
                  marginRight: 20,
                }}
              />
            }
          />
        ) : null}

        <CounterCards
          title={"Active Admins"}
          value={data?.active_admins}
          cardspace={type === "Moderator" ? 0 : 3}
          icon={
            <MdAdminPanelSettings
              style={{
                width: 60,
                height: 60,
                color: "#bfcba5",
                marginRight: 20,
              }}
            />
          }
        />

        {type === "SA" || type === "Admin" ? (
          <CounterCards
            title={"Pending Enquiry"}
            value={data?.concerns}
            cardspace={3}
            icon={
              <HelpRoundedIcon
                style={{
                  width: 40,
                  height: 40,
                  color: "#bfcba5",
                  marginRight: 20,
                }}
              />
            }
          />
        ) : null}

        {type === "Moderator" ? (
          <CounterCards
            title={"Unverified Products"}
            value={data?.unverified_products}
            cardspace={3}
            icon={
              <RiPlantFill
                style={{
                  width: 60,
                  height: 60,
                  color: "#bfcba5",
                  marginRight: 20,
                }}
              />
            }
          />
        ) : null}

        {type === "Moderator" ? (
          <CounterCards
            title={"Reported Posts"}
            value={data?.reported_posts}
            cardspace={3}
            icon={
              <BsFillFilePostFill
                style={{
                  width: 60,
                  height: 45,
                  color: "#bfcba5",
                  marginRight: 20,
                }}
              />
            }
          />
        ) : null}

        {type === "Admin" || type === "SA" ? (
          <CounterCards
            title={"Reported Users"}
            value={data?.reported_users}
            cardspace={3}
            icon={
              <MdReportProblem
                style={{
                  width: 60,
                  height: 60,
                  color: "#bfcba5",
                  marginRight: 20,
                }}
              />
            }
          />
        ) : null}

        {type === "Moderator" ? (
          <CounterCards
            title={"Reported Forum"}
            value={data?.reported_forums}
            cardspace={3}
            icon={
              <ForumRoundedIcon
                style={{
                  width: 45,
                  height: 45,
                  color: "#bfcba5",
                  marginRight: 20,
                }}
              />
            }
          />
        ) : null}
      </Grid>

      <Grid
        sx={{
          width: "100%",
          height: 340,
          mt: 4,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "white",
          boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
        }}
      >
        <InquiryTable handleGoTo={(value) => handleGoTo(value)} />
      </Grid>
      <Toolbar />
    </Stack>
  );
};

export default Dashboard;
