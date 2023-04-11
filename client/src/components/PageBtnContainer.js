import { useAppCtx } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
  const { numOfPages, page } = useAppCtx();

  const pages = Array.from({ length: numOfPages }, (_, idx) => idx + 1);

  const prevPage = () => {
    console.log('prev page');
  };
  const nextPage = () => {
    console.log('next page');
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageN) => (
          <button
            type="button"
            className={`pageBtn ${pageN === page ? 'active' : ''}`}
            key={pageN}
            onClick={() => {
              console.log('change');
            }}
          >
            {pageN}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
