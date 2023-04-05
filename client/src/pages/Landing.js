import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby yr succulents chambray, solarpunk letterpress poutine
            truffaut yuccie fit art party seitan. Unicorn stumptown meh, potato
            shoreditch iPhone ascot kitsch. Taiyaki park belly activated
            charcoal +1 meh craft potato wayfarers af meggings iPhone keffiyeh
            viral. Distillery art party crucifix post-ironic.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
