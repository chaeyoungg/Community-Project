import { Link, useParams } from "react-router-dom";

const Pagination = ({ totalPage, current = 1, setPage, type }) => {
  console.log(totalPage, current);
  // const { type } = useParams();
  const handleClick = (page) => {
    setPage(page);
  };

  let pageList = [];
  for (let page = 1; page <= totalPage; page++) {
    if (current === page) {
      pageList.push(
        <button
          key={page}
          className="text-bold text-blue-700"
          onClick={() => handleClick(page)}
        >
          <Link to={`/posts?type=${type}&limit=10&page=${page}`}>{page}</Link>
        </button>
      );
    } else {
      pageList.push(
        <button
          key={page}
          className="text-bold white"
          onClick={() => handleClick(page)}
        >
          <Link to={`/posts?type=${type}&limit=10&page=${page}`}>{page}</Link>
        </button>
      );
    }
  }
  console.log("arr=>", pageList);
  return <ul className="flex justify-center gap-3 m-4">{pageList}</ul>;
};

export default Pagination;
