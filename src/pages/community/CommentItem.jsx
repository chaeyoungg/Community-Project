import useAxios from "@hooks/useAxios.mjs";
import { memberState } from "@recoil/user/atoms";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function CommentItem({ data, refetch }) {
  const user = useRecoilState(memberState);
  const axios = useAxios();
  const { _id } = useParams();

  console.log();

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${_id}/replies/${data._id}`);
      alert("삭제되었습니다.");
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {/* 댓글 */}
      {user[0]._id === data.user._id ? (
        // 내댓글
        <div className="shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <img
              className="w-8 mr-2 rounded-full"
              src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
              alt="무지 프로필 이미지"
              // onError
            />
            <a href="" className="text-orange-400">
              {data.user.name}
            </a>
            <time
              className="ml-auto text-gray-500"
              dateTime="2024.07.07 12:34:56"
            >
              2024.07.07 12:34:56
            </time>
          </div>
          <div className="flex justify-between items-center mb-2">
            <pre className="whitespace-pre-wrap text-sm">{data.content}</pre>
            <button
              type="button"
              className="bg-red-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <div className="shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <img
              className="w-8 mr-2 rounded-full"
              src={`http://api.fesp.shop/${data.user.profile}`}
            />
            <a href="" className="text-orange-400">
              {data.user.name}
            </a>
            <time
              className="ml-auto text-gray-500"
              dateTime="2024.07.02 14:11:22"
            >
              {data.createdAt}
            </time>
          </div>
          <pre className="whitespace-pre-wrap text-sm">{data.content}</pre>
        </div>
      )}
    </>
  );
}

export default CommentItem;
