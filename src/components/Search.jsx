import Submit from "@components/Submit";
import { useState } from "react";

function Search({ onClick }) {
  const [keyword, setKeyword] = useState("");
  //{{URL}}/posts?type=info&keyword=요가

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  // const { loading, data, error, refetch } = useFetch(
  //   `/posts?type=${type}&keyword=${keyword}limit=10&page=${page}`
  // );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        location.href = "";
      }}
    >
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        onChange={onChange}
      />
      <Submit
        onClick={(e) => {
          e.preventDefault();
          onClick(keyword);
        }}
      >
        검색
      </Submit>
    </form>
  );
}

export default Search;
