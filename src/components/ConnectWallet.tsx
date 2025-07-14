// src/components/ConnectWallet.jsx
import { useState } from "react";
import { createWalletClient, custom } from "viem";

export default function ConnectWallet() {
  const [account, setAccount] = useState();
  const [error, setError] = useState("");

  async function connect() {
    if (!window?.ethereum) {
      setError("MetaMask not found");
      return;
    }

    try {
      const [addr] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(addr);

      const client = createWalletClient({
        transport: custom(window.ethereum),
      });
      const chainId = await client.getChainId();
      console.log("Connected to chain:", chainId);
    } catch (err) {
      setError(err.message ?? "Failed to connect");
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", marginTop: "2rem" }}>
      {account ? (
        <p>✅ Connected: <code>{account}</code></p>
      ) : (
        <button onClick={connect}>Connect MetaMask</button>
      )}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </div>
  );
}
