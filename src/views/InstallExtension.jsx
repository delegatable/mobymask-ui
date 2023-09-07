import React from "react";
import { Typography, Box } from "@mui/material";
import Button from "../components/Button";

function InstallExtension() {
  return (
    <Box
      paddingTop="77px"
      paddingBottom="66px"
      width="96%"
      maxWidth="960px"
      margin="auto"
    >
      <Typography
        component="h3"
        fontSize="20px"
        marginBottom="24px"
        fontWeight="600"
      >
        Get Extension Now
      </Typography>
      <Box
        paddingTop={7}
        paddingBottom={6}
        borderRadius="10px"
        textAlign="center"
        border="1px solid #E5E5E5"
      >
        <Box
          component="img"
          src="/mobymask-extension.png"
          margin="auto"
          width="100%"
          maxWidth="620px"
        />
        <Typography
          color="#2867BB"
          textAlign="center"
          margin="auto"
          fontSize="20px"
          fontWeight="500"
          marginBottom="24px"
          paddingX={2}
        >
          Get warned about phishers on the web and report them:
        </Typography>

        <Typography
          component="a"
          href="https://github.com/lxdao-official/mobymask-extension"
          target="_blank"
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <Button
            label="Install the Web Extension"
            active={false}
            borderRadius="100px"
            color="#0D1320"
          />
        </Typography>
        <Typography textAlign="center" color="#666F85" marginY="24px">
          Users of{" "}
          <Typography
            component="a"
            color="#2867BB"
            style={{ textDecoration: "none" }}
            href="https://metamask.io/flask"
          >
            MetaMask Flask
          </Typography>
          :
        </Typography>
        <Typography
          component="a"
          href="https://montoya.github.io/get-mobymask-snap/"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          <Button
            style={{
              background: "linear-gradient(90deg, #334FB8 0%, #1D81BE 100%)",
              cursor: "pointer",
            }}
            borderRadius="100px"
            color="#fff"
            display="inline-block"
            margin="auto"
            label=" Install the MetaMask Snap"
          />
        </Typography>
      </Box>
    </Box>
  );
}

export default InstallExtension;
