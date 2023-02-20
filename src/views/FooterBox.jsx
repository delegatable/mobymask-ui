import { Typography, Box } from "@mui/material";
import mobymaskLogo from "../assets/mobymaskLogo.png";
import LaconicNetworklogo from "../assets/LaconicNetworklogo.png";
import lxdaoLogo from "../assets/lxdaoLogo.png";

function FooterBox() {
  return (
    <Box backgroundColor="#F1F1F1" padding="90px 0">
      <Box width="96%" maxWidth="960px" margin="auto">
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

        <Box marginTop="60px" display="flex">
          <Box flex="1">
            <Box>
              <Typography
                component="a"
                color="#000"
                fontWeight="600"
                marginRight="30px"
                target="_blank"
                style={{ textDecoration: "none" }}
                href="https://mirror.xyz/0x55e2780588aa5000F464f700D2676fD0a22Ee160/8whNch3m5KMzeo6g5eblcXMMplPf8UpW228cSh3nmzg"
              >
                Learn more
              </Typography>

              <Typography
                component="a"
                color="#000"
                fontWeight="600"
                target="_blank"
                style={{ textDecoration: "none" }}
                href="https://github.com/danfinlay/MobyMask/"
              >
                Fork on GitHub
              </Typography>
            </Box>
            <Typography marginTop={5.5} color="#666F85">
              @2022 MobyMask • MetaMask Ecosystem
            </Typography>
          </Box>
          <Box flex="1">
            <Typography fontWeight="bold">
              MobyMask is technically supported by Laconic and LXDAO
            </Typography>

            <Box marginTop={4} display="flex">
              <Box marginRight="40px">
                <Typography
                  component="a"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  href="https://lxdao.io/"
                >
                  <Box
                    component="img"
                    src={lxdaoLogo}
                    height="40px"
                    alt="lxdao"
                  />
                </Typography>
              </Box>
              <Box color="#101828">
                <Typography
                  component="a"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  href="https://www.laconic.com/"
                >
                  <Box
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
      </Box>
    </Box>
  );
}

export default FooterBox;
