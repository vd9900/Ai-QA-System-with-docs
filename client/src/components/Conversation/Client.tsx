import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ClientBoxprops } from "../../types";

const Client: React.FC<ClientBoxprops> = ({ text, user }) => {
  return (
    <Box
    className={"slide-top"}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{ background: "#fff" }}
        src="https://th.bing.com/th/id/OIP.OesLvyzDO6AvU_hYUAT4IAHaHa?pid=ImgDet&rs=1"
      >
        <AssignmentIcon />
      </Avatar>
      <Box>{text}</Box>
    </Box>
  );
};

export default Client;
