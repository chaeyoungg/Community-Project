import useAxios from "@hooks/useAxios.mjs";
import useFetch from "@hooks/useFetch";
import CommentList from "@pages/community/CommentList";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Detail() {
  const { type, _id } = useParams();
  const location = useLocation();
  const axios = useAxios();
  const navigate = useNavigate();

  const { data } = useFetch(`/posts/${_id}`);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${_id}`);
      console.log("delete Res=>", res);
      if (res) {
        alert("삭제되었습니다.");
        navigate(`/${type}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log(type, _id);
  console.log("locationdata ->", location);
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{data?.item?.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {data?.item?.user?.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data?.item?.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <button
            type="button"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => navigate(`/${type}`)}
          >
            목록
          </button>
          <button
            type="button"
            className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() =>
              navigate(`/${type}/${_id}/edit`, { state: { data: data } })
            }
          >
            수정
          </button>
          <button
            type="button"
            className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </section>
      <CommentList id={_id} data={data} />
    </main>
  );
}

export default Detail;
