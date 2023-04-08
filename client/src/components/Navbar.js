import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppCtx } from '../context/appContext';
import Logo from './Logo';

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          type="button"
          onClick={() => console.log('Toggle sidebar')}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => console.log('show logout')}>
            <FaUserCircle />
            Meshmesh
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button type="button" className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
