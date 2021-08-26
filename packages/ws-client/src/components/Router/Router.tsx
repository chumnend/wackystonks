import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = () => {
  return <h2>Home</h2>;
};

const Room = () => {
  return <h2>Room</h2>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/room">Room</Link>
        </nav>
      </div>

      <Route exact path="/" component={Home} />
      <Route exact path="/room" component={Room} />
    </BrowserRouter>
  );
};

export default Router;
