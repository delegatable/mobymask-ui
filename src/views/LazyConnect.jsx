import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MetaMaskOnboarding from "@metamask/onboarding";
import chainList from "../utils/chainList";
import Button from "../components/Button";

import { useAtom } from "jotai";
import { providerAtom } from "../atoms/providerAtom";
import { Typography } from "@mui/material";

export default function LazyConnect(props) {
  const { actionName, chainId } = props;
  let { opts = {} } = props;
  const { needsAccountConnected = true } = opts;
  const [provider, setInjectedProvider] = useAtom(providerAtom);
  const [accounts, setAccounts] = useState([]);
  const [userChainId, setUserChainId] = useState(false);
  const [, setLoading] = useState(false);

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
        alert("Failed to get accounts!");
        console.error("Failed to get accounts!", err);
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
      <Box textAlign="center">
        <Button
          marginTop="30px"
          color="#fff"
          borderRadius="100px"
          padding="12px 20px"
          style={{
            background: "linear-gradient(90deg, #334FB8 0%, #1D81BE 100%)",
          }}
          label="Get MetaMask"
          onClick={() => {
            const onboarding = new MetaMaskOnboarding();
            onboarding.startOnboarding();
          }}
        />
      </Box>
    );
  }

  if (requiresAction) {
    return (
      <Box>
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
      </Box>
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
  return <Box textAlign="center">{childrenWithProps}</Box>;
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
      alert("Failed to get accounts!");
      console.error(err);
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
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + chainId.toString(16) }],
    });
  };

  const btnTextFn = () => {
    let labelText = "Connect Wallet";
    if (needsToConnectAccount) {
      labelText = "Connect Wallet";
    }
    if (!needsToConnectAccount && needsToSwitchChain) {
      labelText = `Switch to the ${chainName} network`;
    }
    return labelText;
  };

  return (
    <Box marginTop="30px">
      <Typography
        variant="body2"
        width="96%"
        maxWidth="670px"
        margin="auto"
        color="#666F85"
      >
        You need a few things to {actionName}.
      </Typography>
      <Box textAlign="center">
        <Button
          marginTop="20px"
          color="#fff"
          borderRadius="100px"
          padding="12px 20px"
          style={{
            background: "linear-gradient(90deg, #334FB8 0%, #1D81BE 100%)",
          }}
          label={loading ? "Connecting" : btnTextFn()}
          onClick={connectWalletFn}
        ></Button>
      </Box>
    </Box>
  );
}
