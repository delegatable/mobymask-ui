import React, { useState, useEffect } from 'react';

import { Peer } from '@cerc-io/peer';

import { PeerContext } from './PeerContext';

const PeerProvider = ({ signalServer, relayNode, children }) => {
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const init = async () => {
      const peer = new Peer()
      await peer.init(signalServer, relayNode);

      // Debug
      console.log(`Peer ID: ${peer.peerId.toString()}`);
      // Subscribe to messages from remote peers
      peer.subscribeMessage((peerId, message) => {
        console.log(`${peerId.toString()} > ${message}`)
      })
      // Expose broadcast method in browser to send messages
      window.broadcast = (message) => {
        peer.broadcastMessage(message)
      }

      setPeer(peer);
    };

    init();
    
    return () => {
      if (peer.node) {
        // TODO: Await for peer close
        peer.close()
      }
    }
  }, []);

  return (
    <PeerContext.Provider value={peer}>
      {children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
