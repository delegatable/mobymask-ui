import cn from "classnames";
import { Typography, Box } from "@mui/material";
import mobymaskLogo from "../assets/mobymaskLogo.png";
import LaconicNetworklogo from "../assets/LaconicNetworklogo.png";
import lxdaoLogo from "../assets/lxdaoLogo.png";

function FooterBox() {
  return (
    <Box
      backgroundColor="#F1F1F1"
      height="557px"
      paddingTop="88px"
      paddingLeft="256px">
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Typography
          component="img"
          src={mobymaskLogo}
          width="71px"
          marginRight="15px"
          alt="logo"
        />
        <Typography component="span" fontSize="31px" fontWeight="600">
          MobyMask
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        fontSize="18px"
        fontWeight="600"
        color="#101828"
        marginTop="68px">
        <Box display="flex" justifyContent="flex-start" width="456px">
          <Box component="p" margin="0" marginRight="20px" flexShrink="0">
            <Typography
              component="a"
              color="#000"
              fontWeight="600"
              style={{ textDecoration: "none" }}
              href="https://mirror.xyz/0x55e2780588aa5000F464f700D2676fD0a22Ee160/8whNch3m5KMzeo6g5eblcXMMplPf8UpW228cSh3nmzg">
              Learn more
            </Typography>
          </Box>
          <Box component="p" margin="0">
            <Typography
              component="a"
              color="#000"
              fontWeight="600"
              style={{ textDecoration: "none" }}
              href="https://github.com/danfinlay/MobyMask/">
              Fork on GitHub
            </Typography>
          </Box>
        </Box>

        <Box component="p" flexShrink="0" margin="0">
          Mobymask is technically supported by Laconic and LXDAO
        </Box>
      </Box>
      <Box
        marginTop="43px"
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap">
        <Box
          component="p"
          width="456px"
          color="#666F85"
          display="flex"
          justifyContent="flex-start"
          flexShrink="0">
          @2022 MobyMask • A ConsenSys Formation
        </Box>
        <Box display="flex" justifyContent="flex-start" flexShrink="0">
          <Box component="p" marginRight="30px">
            <Typography href="https://lxdao.io/">
              <Typography
                component="img"
                src={lxdaoLogo}
                height="40px"
                alt="lxdao"
              />
            </Typography>
          </Box>
          <Box component="p" color="#101828">
            <Typography href="https://www.laconic.com/">
              <Typography
                component="img"
                src={LaconicNetworklogo}
                height="40px"
                alt="laconic"
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FooterBox;
