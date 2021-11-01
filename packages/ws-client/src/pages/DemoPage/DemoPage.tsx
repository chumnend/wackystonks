import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { StonkInfo } from 'ws-assets';

import NavBar from '../../components/Header';
import { SocketEvents } from '../../constants';
import { useSocket } from '../../context/SocketProvider';

const DemoPage = () => {
  const [stonks, setStonks] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.emit(SocketEvents.CREATE_GAME, {}, (id: string) => {
      window.localStorage.setItem('socketId', id);
    });

    socket.on(SocketEvents.UPDATE_STONKS, (recv) => {
      const { values } = recv;
      setStonks(values);
    });

    return () => {
      socket.emit(SocketEvents.DELETE_GAME, { id: window.localStorage.getItem('socketId') });
      socket.off(SocketEvents.UPDATE_STONKS);
    };
  }, []);

  const renderStonks = stonks.map((stonk: StonkInfo, idx) => {
    const data = stonk.previousPrices.map((price) => ({
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
      <NavBar />
      <h1>Demo Page</h1>
      <div>{socket.connected ? renderStonks : <div>Trying to connect...</div>}</div>
    </div>
  );
};

export default DemoPage;
