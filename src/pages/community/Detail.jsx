import CommentList from "@pages/community/CommentList";
import { useLocation, useParams } from "react-router-dom";

function Detail() {
  const { type, _id } = useParams();
  const location = useLocation();
  const data = location.state;

  console.log(type, _id);
  console.log("locationdata ->", data);
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{data?.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {data?.user?.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data?.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <button
            type="button"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => history.back()}
          >
            목록
          </button>
          <button
            type="button"
            className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => (location.href = "/info/1/edit")}
          >
            수정
          </button>
          <button
            type="button"
            className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => (location.href = "/info")}
          >
            삭제
          </button>
        </div>
      </section>
      <CommentList id={_id} />
    </main>
  );
}

export default Detail;
