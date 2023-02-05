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
  const [error, setError] = useState(null);

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
  }, []);

  // Get current selected network:
  useEffect(() => {
    if (!provider || userChainId) {
      return;
    }
    getUserChainId().then(setUserChainId).catch(console.error);

    async function getUserChainId() {
      const chainId = await provider.request({ method: "eth_chainId" });
      return chainId;
    }

    provider.on("chainChanged", setUserChainId);

    return () => {
      provider.removeListener("chainChanged", setUserChainId);
    };
  }, []);

  const needsToSwitchChain = Number(userChainId) !== chainId;
  const needsToConnectAccount =
    needsAccountConnected && (!accounts || accounts.length === 0);
  const requiresAction = needsToSwitchChain || needsToConnectAccount;

  if (error) {
    return (
      <div className="lazyConnect">
        <h3>Something went wrong 😿:</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
    return (
      <div className="text-center">
        {createChecklist({
          hasWallet: MetaMaskOnboarding.isMetaMaskInstalled(),
          provider,
          needsToConnectAccount,
          setLoading,
          setUserChainId,
          chainId: chainId,
          userChainId,
          chainName,
          setAccounts,
          needsAccountConnected,
          actionName,
          accounts,
        })}
        <Button
          className="mx-auto inline-block"
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
          setError,
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

  if (loading) {
    return <div className="lazyConnect">Loading...</div>;
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
    setLoading,
    setUserChainId,
    needsToConnectAccount,
    needsAccountConnected,
    actionName,
    setError,
    hasWallet,
    accounts,
  } = checklistOpts;
  return (
    <div>
      <p className="w-[670px] m-auto">You need a few things to {actionName}.</p>
      <div className="text-center">
        {switchAccountsItem({
          needsAccountConnected,
          needsToConnectAccount,
          setAccounts,
          provider,
          setLoading,
          accounts,
          hasWallet,
        }) ||
          switchNetworkItem({
            chainId,
            setError,
            userChainId,
            chainName,
            setAccounts,
            provider,
            setLoading,
            setUserChainId,
            hasWallet,
          })}
      </div>
    </div>
  );
}

function switchAccountsItem(opts) {
  const { needsToConnectAccount, setAccounts, accounts, provider, hasWallet } =
    opts;

  if (!needsToConnectAccount) {
    return null;
  }

  if (!hasWallet) {
    return null;
  }

  if (typeof accounts !== "undefined" && accounts.length > 0) {
    return null;
  }

  return (
    <Button
      className={cn(
        "mt-[30px] text-white rounded-[100px] px-[20px] py-[12px]",
        "bg-gradient-to-r from-[#334FB8] to-[#1D81BE]"
      )}
      label="Connect A Wallet"
      onClick={async () => {
        const _accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setAccounts(_accounts);
      }}></Button>
  );
}

function switchNetworkItem(opts) {
  const {
    chainId,
    userChainId,
    chainName,
    provider,
    setLoading,
    setUserChainId,
    hasWallet,
    setError,
  } = opts;
  console.log(chainId, userChainId);
  const needsToSwitchChain = !!chainId && Number(userChainId) !== chainId;

  if (!needsToSwitchChain) {
    return null;
  }

  if (!hasWallet) {
    return null;
  }

  return (
    <Button
      label={`Switch to the ${chainName} network`}
      className={cn(
        "mt-[30px] text-white rounded-[100px] px-[20px] py-[12px]",
        "bg-gradient-to-r from-[#334FB8] to-[#1D81BE]"
      )}
      onClick={async () => {
        provider
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x" + chainId.toString(16) }],
          })
          .then(() => {
            setUserChainId(chainId);
            setLoading(false);
          })
          .catch((reason) => {
            setLoading(false);
            setError(reason);
          });
        setLoading(true);
      }}
    />
  );
}
