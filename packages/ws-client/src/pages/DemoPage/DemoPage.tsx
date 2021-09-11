import { useEffect, useState } from 'react';

import { useSocket } from '../../providers/SocketProvider';

interface IStonk {
  name: string;
  symbol: string;
  price: number;
}

const DemoPage = () => {
  const [stonks, setStonks] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('status', (msg) => {
      console.log(msg);
    });

    socket.on('update', (obj) => {
      console.log(obj);
      setStonks(obj);
    });

    return () => {
      socket.off('status');
      socket.off('update');
    };
  }, []);

  const stonksList = stonks.map((stonk: IStonk, idx) => (
    <div key={idx}>
      <h2>
        {stonk.name}: {stonk.symbol} = {stonk.price}
      </h2>
    </div>
  ));

  return (
    <>
      <div>{stonksList}</div>
    </>
  );
};

export default DemoPage;
