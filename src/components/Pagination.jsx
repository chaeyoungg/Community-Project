import { Link } from "react-router-dom";

const Pagination = ({ totalPage, current = 1 }) => {
  console.log(totalPage, current);
  let pageList = [];
  for (let page = 1; page <= totalPage; page++) {
    pageList.push(
      <li key={page} className="text-bold text-blue-700">
        <Link to={`/info?page=${page}`}>{page}</Link>
      </li>
    );
  }
  console.log("arr=>", pageList);
  return <ul className="flex justify-center gap-3 m-4">{pageList}</ul>;
};

export default Pagination;
