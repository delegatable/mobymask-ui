import logo from "../assets/logo.svg";
import twitter from "../assets/twitter.png";
import github from "../assets/github.png";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";

function HeaderBox() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #334fb8, #1a87bf)",
      }}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      color="white"
      overflow="hidden"
    >
      <Box
        width="100%"
        boxSizing="border-box"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="2.662037% 2.3148148%"
      >
        <Box display="flex" justifyContent="flex-start">
          <Typography
            component="img"
            className="App-logo"
            src={logo}
            alt="logo"
          />
          <Typography
            style={{ WebkitTextStroke: "1px #000" }}
            fontWeight="600"
            fontSize="1.9375rem"
          >
            MobyMask
          </Typography>
        </Box>
        <Box display="flex">
          <Link href="#" marginRight="28px">
            <Avatar
              width="48px"
              height="48px"
              cursor="pointer"
              src={twitter}
              alt="twitter"
            />
          </Link>
          <Link href="#">
            <Avatar
              width="48px"
              height="48px"
              cursor="pointer"
              src={github}
              alt="github"
            />
          </Link>
        </Box>
      </Box>

      {/* Based on https://codepen.io/goodkatz/pen/LYPGxQz?editors=1100 */}
      <Box width="100%">
        <Box
          className="whale-icon"
          marginLeft="50%"
          position="relative"
          left={200}
          bottom={-150}
          component="img"
          src="/whale.png"
          width="200px"
          zIndex={0}
          marginTop="-50px"
        ></Box>
        <svg
          style={{
            marginBottom: "-7px",
            width: "100%",
            minHeight: 100,
            maxHeight: 150,
            height: "15vh",
            position: "relative",
            zIndex: 1,
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.9)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.8)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.7)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </Box>
    </Box>
  );
}

export default HeaderBox;
