import "./search.css";

const Search = (props) => {
  const { handleFilter, setFilter, filter } = props;

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  return (
    <div className="nav">
      <div className="pageTitle">
        <h2>Code Snippet</h2>
      </div>
      <div className="search-bar">
        <div className="search-box">
          <input
            type="text"
            value={filter}
            placeholder="Search Text"
            onChange={handleFilterChange}
            onKeyUp={(event) => {
              if (event.code === "Enter") {
                event.preventDefault();
                handleFilter(filter);
              }
            }}
          />
          <button onClick={() => handleFilter(filter)}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
