import { useEffect, useState } from 'react';

import { socket } from '../../socket';

interface IStonk {
  name: string;
  symbol: string;
  price: number;
}

const DemoPage = () => {
  const [stonks, setStonks] = useState([]);

  useEffect(() => {
    socket.on('status', (msg) => {
      console.log(msg);
    });

    socket.on('update', (obj) => {
      setStonks(obj);
    });
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
