import useMutation from "@hooks/useMutation";
import { useState } from "react";

import { useParams } from "react-router-dom";

function CommentNew({ refetch }) {
  // const axios = useAxios();
  const { _id } = useParams();
  const [comment, setComment] = useState("");
  //state가 바뀌면 화면은 자동갱신, 반대는 적용되지 않으니까 이벤트함수를 필요로
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const { send } = useMutation(`/posts/${_id}/replies`, {
    method: "POST",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { content: comment };

    try {
      console.log("222222", formData);

      const res = await send({
        body: JSON.stringify(formData),
      });
      console.log("댓글등록res=>", res);
      refetch();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            onChange={handleChange}
            value={comment} // Ensure the textarea value is controlled
          ></textarea>

          {/* 에러 메세지 출력 */}
          {/*
          <p className="ml-2 mt-1 text-sm text-red-500">
            에러 메세지
          </p>
          */}
        </div>
        <button
          type="submit"
          className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          댓글 등록
        </button>
      </form>
    </div>
  );
}
export default CommentNew;
