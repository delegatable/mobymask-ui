import logo from "../assets/logo.svg";
import twitter from "../assets/twitter.png";
import github from "../assets/github.png";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";

function HeaderBox() {
  return (
    <header className="App-header">
      <Box
        width="100%"
        boxSizing="border-box"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="46px 40px">
        <Box display="flex" justifyContent="flex-start">
          <img src={logo} className="App-logo" alt="logo" />
          <Typography
            style={{ WebkitTextStroke: "1px #000" }}
            fontWeight="600"
            fontSize="31px">
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
      <Box className="waves">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 20 190 28"
          preserveAspectRatio="none"
          shapeRendering="auto">
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
              fill="rgba(255,255,255,0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </Box>
    </header>
  );
}

export default HeaderBox;
