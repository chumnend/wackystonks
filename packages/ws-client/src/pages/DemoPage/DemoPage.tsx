import { useEffect } from 'react';

import { socket } from '../../socket';

const DemoPage = () => {
  useEffect(() => {
    socket.on('status', (msg) => {
      console.log(msg);
    });

    socket.on('update', (obj) => {
      console.log(obj);
    });
  }, []);

  return <h2>Demo</h2>;
};

export default DemoPage;
