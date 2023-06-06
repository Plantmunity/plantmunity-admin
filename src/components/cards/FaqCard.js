import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Stack,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Dialog,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Question from "../../images/question.png";
import Answer from "../../images/answer.png";
import { RiEditFill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import EditFaqDialog from "../dialogs/EditFaqDialog";
import DelFaqDialog from "../dialogs/DelFaqDialog";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FaqCard = ({ id, question, answer, status, toast }) => {
  const theme = useTheme();
  const extraSmall = useMediaQuery(theme.breakpoints.down(600));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const [openDel, setOpenDel] = useState(false);

  const handleOpenDel = () => {
    setOpenDel(!openDel);
  };

  return (
    <Card sx={{ width: "100%", mt: 1 }}>
      <CardContent>
        <Grid container directiom="row" alignItems="center">
          <Grid item>
            <img
              src={Question}
              alt="Question Icon"
              style={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid
            item
            sx={{ paddingLeft: 2, maxWidth: { xs: 200, sm: 300, md: 520 } }}
          >
            <Typography
              variant={extraSmall ? "body1" : "h5"}
              align="left"
              style={{ fontFamily: "apple-system", color: "#418049" }}
              gutterBottom
            >
              {question}
            </Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Tooltip title={"Delete"}>
              <IconButton onClick={() => handleOpenDel()}>
                <BsFillTrashFill style={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title={"Edit"}>
              <IconButton onClick={() => handleOpenEdit()}>
                <RiEditFill />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack direction="row">
            <img
              src={Answer}
              alt="Answer Icon"
              style={{ width: 50, height: 50 }}
            />
            <Stack direction="column" sx={{ paddingLeft: 2 }}>
              <Typography
                variant={extraSmall ? "body1" : "h6"}
                align="left"
                style={{ fontFamily: "-apple-system", color: "black" }}
                gutterBottom
              >
                ANSWER:
              </Typography>
              <Typography
                paragraph
                variant={extraSmall ? "body1" : "h6"}
                style={{ fontFamily: "-apple-system" }}
              >
                {answer}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Collapse>

      <Dialog
        maxWidth={false}
        scroll={"body"}
        open={openEdit}
        onClose={handleOpenEdit}
      >
        <EditFaqDialog
          handleClose={() => handleOpenEdit()}
          toast={(message) => toast(message)}
          id={id}
          ans={answer}
          questn={question}
          stat={status}
        />
      </Dialog>
      <Dialog
        maxWidth={false}
        scroll={"body"}
        open={openDel}
        onClose={handleOpenDel}
      >
        <DelFaqDialog
          handleClose={() => handleOpenDel()}
          toast={(message) => toast(message)}
          id={id}
        />
      </Dialog>
    </Card>
  );
};

export default FaqCard;
