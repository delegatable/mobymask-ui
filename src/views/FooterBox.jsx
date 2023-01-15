import cn from "classnames";
import mobymaskLogo from "../assets/mobymaskLogo.png";
import LaconicNetworklogo from "../assets/LaconicNetworklogo.png";
import lxdaoLogo from "../assets/lxdaoLogo.png";

function FooterBox() {
  return (
    <div className={cn("bg-[#F1F1F1] h-[557px] pt-[88px] pl-[256px]")}>
      <div className="flex justify-start">
        <img src={mobymaskLogo} className="w-[71px] mr-[15px]" alt="logo" />
        <span className="text-[31px] font-[600]">MobyMask</span>
      </div>

      <div
        className={cn(
          "flex justify-start flex-wrap text-[18px] text-[#101828] mt-[68px]"
        )}>
        <div className={cn("flex justify-start w-[456px] ")}>
          <p className="mr-[20px] shrink-0">
            <a href="https://mirror.xyz/0x55e2780588aa5000F464f700D2676fD0a22Ee160/8whNch3m5KMzeo6g5eblcXMMplPf8UpW228cSh3nmzg">
              Learn more
            </a>
          </p>
          <p>
            <a href="https://github.com/danfinlay/MobyMask/">Fork on GitHub</a>
          </p>
        </div>

        <p className="shrink-0">
          Mobymask is technically supported by Laconic and LXDAO
        </p>
      </div>
      <div className="mt-[43px] flex justify-start flex-wrap">
        <p className="w-[456px] text-[#666F85] flex justify-start  shrink-0">
          @2022 MobyMask • A ConsenSys Formation
        </p>
        <div className={cn("flex justify-start shrink-0")}>
          <p className="mr-[30px]">
            <a href="https://lxdao.io/">
              <img src={lxdaoLogo} className="h-[40px]" alt="" />
            </a>
          </p>
          <p className="text-[#101828]">
            <a href="https://www.laconic.com/">
              <img src={LaconicNetworklogo} className="h-[40px]" alt="" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterBox;
