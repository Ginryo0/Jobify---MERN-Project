import { FormRow, FormRowSelect } from '.';
import { useAppCtx } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppCtx();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <div className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            changeHandler={handleSearch}
            placeholder="Position"
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            changeHandler={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            changeHandler={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort*/}
          <FormRowSelect
            name="sort"
            value={sort}
            changeHandler={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            type="button"
            onClick={clearFilters}
          >
            clear filters
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default SearchContainer;
