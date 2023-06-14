import React from "react";
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PendingInquiryTable from "../tables/PendingInquiryTable";
import ProcessedConcernTable from "../tables/ProcessedInquiryTable";
const Concern = ({ toast }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Arvo",
            fontWeight: "bold",
            flexGrow: 1,
            ml: mobile ? 0 : 3,
          }}
        >
          Concern Management
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          sx={{ width: 250 }}
        >
          <Tab
            value={1}
            label={
              <Typography
                variant="h6"
                sx={{ fontFamily: "Raleway", textTransform: "none" }}
              >
                Pending
              </Typography>
            }
          />
          <Tab
            value={2}
            label={
              <Typography
                variant="h6"
                sx={{ fontFamily: "Raleway", textTransform: "none" }}
              >
                Processed
              </Typography>
            }
          />
        </Tabs>
      </Stack>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>

      {value === 1 ? (
        <Box
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: 3,
            mt: 2,
            py: 2,
            height: "70vh",
            overflow: "auto",
            boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
          }}
        >
          <PendingInquiryTable toast={(message) => toast(message)} />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: 3,
            mt: 2,
            py: 2,
            height: "70vh",
            overflow: "auto",
            boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
          }}
        >
          <ProcessedConcernTable />
        </Box>
      )}
    </Box>
  );
};

export default Concern;
