import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Error: React.FC = () => {
  return (
    <Box
      className={"slide-top"}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        background: "#e7ebf0",
        // justifyContent: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{ background: "#fff" }}
        src="https://th.bing.com/th/id/R.31a25011c7a2db24ad7d6ecfc6898ce7?rik=mt%2fggtk5uxFQbw&riu=http%3a%2f%2fc93fea60bb98e121740fc38ff31162a8.s3.amazonaws.com%2fwp-content%2fuploads%2f2017%2f03%2fdatarobot.jpg&ehk=P0IVwUi3%2boq1gaoV7unDcGw58WlR9j3yHzS1OLhLVhU%3d&risl=&pid=ImgRaw&r=0"
      >
        <AssignmentIcon />
      </Avatar>
      <Box sx={{ color: "red", fontSize: "14px" }}>
        Something went wrong, Try again later!
      </Box>
    </Box>
  );
};

export default Error;
