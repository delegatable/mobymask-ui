import React, { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import chainList from "../chainList";
import Button from "../components/Button";

import cn from "classnames";
import { useAtom } from "jotai";
import { providerAtom } from "../atoms/providerAtom";

export default function LazyConnect(props) {
  const { actionName, chainId } = props;
  let { opts = {} } = props;
  const { needsAccountConnected = true } = opts;
  const [provider, setInjectedProvider] = useAtom(providerAtom);
  const [accounts, setAccounts] = useState([]);
  const [userChainId, setUserChainId] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!provider && MetaMaskOnboarding.isMetaMaskInstalled()) {
    setInjectedProvider(window.ethereum);
  }

  const chainName = chainId ? chainList[Number(chainId)] : null;
  // Get accounts;
  useEffect(() => {
    if (!provider) {
      return;
    }
    getAccounts().then(setAccounts).catch(console.error);

    async function getAccounts() {
      try {
        const _accounts = await provider.request({ method: "eth_accounts" });
        if (_accounts.length > 0) {
          setAccounts(_accounts);
        }
      } catch (err) {
        console.log("Getting accounts failed!", err);
      }
    }

    provider.on("accountsChanged", setAccounts);

    return () => {
      provider.removeListener("accountsChanged", setAccounts);
    };
  }, [provider]);

  // Get current selected network:
  useEffect(() => {
    if (!provider) {
      return;
    }
    getUserChainId().then(setUserChainId).catch(console.error);

    async function getUserChainId() {
      const chainId = await provider.request({ method: "eth_chainId" });
      return Number(chainId);
    }

    provider.on("chainChanged", setUserChainId);

    return () => {
      provider.removeListener("chainChanged", setUserChainId);
    };
  }, [provider]);

  const needsToSwitchChain = Number(userChainId) !== chainId;
  const needsToConnectAccount =
    needsAccountConnected && (!accounts || accounts.length === 0);
  const requiresAction = needsToSwitchChain || needsToConnectAccount;

  if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
    return (
      <div className="text-center">
        <Button
          className={cn(
            "mt-[30px] text-white rounded-[100px] px-[20px] py-[12px]",
            "bg-gradient-to-r from-[#334FB8] to-[#1D81BE]"
          )}
          label="Get MetaMask"
          onClick={() => {
            const onboarding = new MetaMaskOnboarding();
            onboarding.startOnboarding();
          }}
        />
      </div>
    );
  }

  if (requiresAction) {
    return (
      <div className="lazyConnect">
        {createChecklist({
          setLoading,
          provider,
          needsToConnectAccount,
          hasWallet: MetaMaskOnboarding.isMetaMaskInstalled(),
          chainId: chainId,
          userChainId,
          setUserChainId,
          chainName,
          setAccounts,
          needsAccountConnected,
          actionName,
          accounts,
        })}
      </div>
    );
  }

  const { children } = props;

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { provider });
    }
    return child;
  });
  return <div className="text-center">{childrenWithProps}</div>;
}

function createChecklist(checklistOpts) {
  const {
    chainId,
    userChainId,
    chainName,
    setAccounts,
    provider,
    loading,
    setLoading,
    needsToConnectAccount,
    actionName,
    hasWallet,
  } = checklistOpts;

  const needsToSwitchChain = !!chainId && Number(userChainId) !== chainId;

  if (!hasWallet) {
    return null;
  }

  const connectWalletFn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (needsToConnectAccount) {
        await connectAccountFn();
      }

      if (needsToSwitchChain) {
        await connectChainFn();
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const connectAccountFn = async () => {
    const _accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    setAccounts(_accounts);
  };

  const connectChainFn = async () => {
    const result = await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + chainId.toString(16) }],
    });
  };

  const btnTextFn = () => {
    let labelText = "Connect A Wallet";
    if (needsToConnectAccount) {
      labelText = "Connect A Wallet";
    }
    if (!needsToConnectAccount && needsToSwitchChain) {
      labelText = `Switch to the ${chainName} network`;
    }
    return labelText;
  };

  return (
    <div>
      <p className="w-[670px] m-auto">You need a few things to {actionName}.</p>
      <div className="text-center">
        <Button
          className={cn(
            "mt-[30px] text-white rounded-[100px] px-[20px] py-[12px]",
            "bg-gradient-to-r from-[#334FB8] to-[#1D81BE]"
          )}
          label={loading ? "Connecting" : btnTextFn()}
          onClick={connectWalletFn}></Button>
      </div>
    </div>
  );
}