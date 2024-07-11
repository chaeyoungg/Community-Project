// import useAxios from "@hooks/useAxios.mjs";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import useFetch from "@hooks/useFetch";
import ListItem from "@pages/community/ListItem";
import { memberState, typeState } from "@recoil/user/atoms";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
// import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

function List() {
  // const { type } = useParams();s
  // const type = "info";
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  // const axios = useAxios();
  const user = useRecoilState(memberState);
  const type = useRecoilValue(typeState);
  //fetch 훅을 통해 가져오기
  const { loading, data, error, refetch } = useFetch(
    `/posts?type=${type}&limit=10&page=${page}&keyword=${keyword}`
  );

  useEffect(() => {
    refetch();
  }, [page, type, keyword]);
  // const { loading, data, error, refetch } = useFetch(`/posts`);
  console.log("type => ", type);

  console.log("fetch리턴값=>", data);

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    setPage(1);
  };

  // useEffect(() => {
  //   getData();
  // });

  // const getData = async () => {
  //   try {
  //     const res = await axios("/posts", {
  //       params: {
  //         name: "chaeyoung",
  //       },
  //     });

  //     console.log("res =>", res);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const { data, error, isLoading } = useQuery({
  //   // 캐시 관리를 위해
  //   queryKey: ["info"],
  //   queryFn: fetchData,
  // });

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search onClick={handleSearch} />
        {/* <form
          onSubmit={(event) => {
            event.preventDefault();
            location.href = "";
          }}
        >
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <button
            type="submit"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            검색
          </button>
        </form> */}
        {/* 
        <Link
          to={`/${type}/new`}
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => {
            // user[0] ? ㅜ/ : console.log("no");
          }}
        >
          글작성
        </Link> */}
        <button
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => {
            if (user[0]) {
              navigate(`/${type}/new`);
            } else {
              alert("로그인 후 글 작성이 가능합니다.");
              navigate("/user/login");
            }
          }}
        >
          글작성
        </button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            {/*
            <tr>
              <td colSpan="6" className="py-20 text-center">로딩중...</td>
            </tr>
          */}

            {/* 에러 메세지 출력 */}
            {/*
            <tr>
              <td colSpan="6" className="py-20 text-center">에러 메세지</td>
            </tr>
          */}

            {/* 본문 출력 */}
            {data?.item?.map((item) => (
              <ListItem key={item._id} type={type} data={item} />
            ))}
            {/* <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
              <td className="p-2 text-center">1</td>
              <td
                className="p-2 truncate indent-4 cursor-pointer"
                onClick={() => (location.href = "/info/1")}
              >
                좋은 소식이 있습니다.
              </td>
              <td className="p-2 text-center truncate">제이지</td>
              <td className="p-2 text-center hidden sm:table-cell">22</td>
              <td className="p-2 text-center hidden sm:table-cell">5</td>
              <td className="p-2 truncate text-center hidden sm:table-cell">
                2024.07.03 17:59:13
              </td>
            </tr> */}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <div>
          {/* {getPage()} */}
          {/* <li className="text-bold text-blue-700">
              <a href="/info?page=1">1</a>
            </li>
            <li>
              <a href="/info?page=2">2</a>
            </li> */}

          <Pagination
            totalPage={data?.pagination?.totalPages}
            current={data?.pagination?.page}
            setPage={setPage}
            refetch={refetch}
            type={type}
          />
        </div>
      </section>
    </main>
  );
}

export default List;
