import { Typography, Box } from "@mui/material";
import MobymaskLogo from "../assets/mobymask_logo.png";
import LaconicLogo from "../assets/laconic_logo.png";
import LxdaoLogo from "../assets/lxdao_logo.png";

function FooterBox() {
  return (
    <Box
      backgroundColor="#F1F1F1"
      paddingY={{
        xs: "40px",
        md: "80px",
      }}
    >
      <Box width="96%" maxWidth="960px" margin="auto">
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography
            component="img"
            src={MobymaskLogo}
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
          flexWrap="wrap"
          flexDirection={{
            xs: "column",
            md: "row",
          }}
        >
          <Box marginTop={{ xs: 3.5, md: 7.5 }} flex="1">
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
            <Typography marginTop={{ xs: 2, md: 5.5 }} color="#666F85">
              @2022 MobyMask • MetaMask Ecosystem
            </Typography>
          </Box>
          <Box marginTop={{ xs: 3.5, md: 7.5 }} flex="1">
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
                    src={LxdaoLogo}
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
                    src={LaconicLogo}
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
