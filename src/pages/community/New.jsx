import useAxios from "@hooks/useAxios.mjs";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function New() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axios = useAxios();
  const { type } = useParams();
  // {
  //   "type": "info",
  //   "title": "인포다인포.",
  //   "content": "오늘 왜 화요일?",
  //   "image": "sample-bugatti.png",
  //   "tag": "혼자,떠나요,제주도"
  // }

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      formData.type = type;
      const res = await axios.post("/posts", formData);
      console.log("res =>", res);
      alert("등록 완료되었습니다.");
      navigate(`/${type}/${res?.data?.item?._id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              {...register("title", {
                required: "제목은 필수 입력값입니다.",
              })}
            />
            {errors.title && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.title.message}
              </p>
            )}

            {/* /                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              {...register("content", {
                required: "내용은 필수 입력값입니다.",
              })}
            ></textarea>
            {errors.content && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.content.message}
              </p>
            )}
            {/* <!-- 입력값 검증 에러 출력 --> */}
            {/* <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              등록
            </button>
            <button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default New;
