# MobyMask UI

MobyMask is a lightweight, viral invite-based phishing report system with built-in accountability and revocation features. It's available at <https://mobymask.com>.

It is based on the [Delegatable Eth](https://github.com/danfinlay/delegatable-eth) framework, designed for making counterfactually mintable soulbound tokens (or off chain delegations).

This repository is dedicated to the user interface. For the extension repository, please visit: <https://github.com/lxdao-official/mobymask-extension>.

## How to run the app locally?

1. Begin the local backend services by following the instructions in this document: <https://github.com/cerc-io/mobymask-watcher/blob/main/mainnet/README.md>.
2. `git clone` this repo.
3. Open Docker and remove the MobyMask app container associated with port 3000 (since we'll be running the latest version of the app locally).
4. Run `yarn install && npm run start`.
5. Open your browser and navigate to <http://localhost:3000/>

You will be able to see the website and test on your local machine.

## How to create an invitation link?

MobyMask is invite-based phishing report system. If you want to test the invitation feature on your local environment, you need to create an invitation link first.

For creating an invitation link, please:

1. `git clone` https://github.com/delegatable/MobyMask
2. `yarn install && cd ./packages/server`
3. Create the following two files:

```
secrets.json:

{
  "rpcUrl": "http://localhost:8545",
  "privateKey": "a377edc6a0b7689cb3ff6cbb95151ae96f428bc8eb037643f669dc63d1c5fc87",
  "baseURI": "http://127.0.0.1:3000/#"
}

config.json:

{
  "address": "0x1ca7c995f8eF0A2989BbcE08D5B7Efe50A584aa1",
  "name": "MobyMask",
  "chainId": 31337
}
```

4. Run the command `ENV='PROD' npm run start`, you will be able to get the invitation link like:

```
http://127.0.0.1:3000/#/members?invitation=%7B%22v%22%3A1%2C%22signedDelegations%22%3A%5B%7B%22signature%22%3A%220x1202b99fec963ddcf0aaea739f755bd6367ff2aada6bfa7a4efb476b64f1a3f729bd6ae19294ceda5bb7da10e7df9f52d717c0c77a6ef14074e9dfeab270a96f1c%22%2C%22delegation%22%3A%7B%22delegate%22%3A%220x403CA2Dac603edA1f7698230326Aa16f0b462B61%22%2C%22authority%22%3A%220x0000000000000000000000000000000000000000000000000000000000000000%22%2C%22caveats%22%3A%5B%7B%22enforcer%22%3A%220xBB9dB86eA37760019901CF2aDd0a15421a143CeA%22%2C%22terms%22%3A%220x0000000000000000000000000000000000000000000000000000000000000000%22%7D%5D%7D%7D%5D%2C%22key%22%3A%220xe7906ae273b283761a0fa8273d8db8f14711ba60fe97480726f66b883f823c84%22%7D
```

## License

MIT

## Community

MobyMask Discord: <https://discord.gg/UBzChkFSUp>
