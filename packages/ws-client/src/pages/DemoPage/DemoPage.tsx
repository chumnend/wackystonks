import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import { useSocket } from '../../providers/SocketProvider';

interface Stonk {
  name: string;
  symbol: string;
  price: number;
  priceHistory: number[];
}

const DemoPage = () => {
  const [stonks, setStonks] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('update', (stonks) => {
      setStonks(stonks);
    });

    return () => {
      socket.off('update');
    };
  }, []);

  const renderStonks = stonks.map((stonk: Stonk, idx) => {
    const data = stonk.priceHistory.map((price) => ({
      time: new Date(Date.now()).toUTCString(),
      pv: price,
    }));

    return (
      <div key={idx}>
        <h2>
          {stonk.name}: {stonk.symbol} = {stonk.price}
        </h2>
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    );
  });

  return (
    <div>
      <h1>Demo Page</h1>
      <div>{socket.connected ? renderStonks : <div>Trying to connect...</div>}</div>
    </div>
  );
};

export default DemoPage;
