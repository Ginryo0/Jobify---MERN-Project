import main from '../assets/images/main.svg';
import { Logo } from '../components/index';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link, Navigate } from 'react-router-dom';
import { useAppCtx } from '../context/appContext';

const Landing = () => {
  const { user } = useAppCtx();
  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby yr succulents chambray, solarpunk letterpress poutine
              truffaut yuccie fit art party seitan. Unicorn stumptown meh,
              potato shoreditch iPhone ascot kitsch. Taiyaki park belly
              activated charcoal +1 meh craft potato wayfarers af meggings
              iPhone keffiyeh viral. Distillery art party crucifix post-ironic.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
