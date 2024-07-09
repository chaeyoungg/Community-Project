import useAxios from "@hooks/useAxios.mjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axios = useAxios();
  const [isValid, setIsValis] = useState(false);

  const emailCheck = async () => {
    const emailDom = document.querySelector('input[id="email"]');
    // console.log(emailDom.value);

    try {
      await axios("/users/email", {
        params: {
          email: emailDom.value,
        },
      });
      // if
      setIsValis(true);
      alert("사용 가능한 이메일입니다.");
    } catch (err) {
      if (err.response.status === 409)
        alert("해당 이메일로 가입된 계정이 있습니다.");
      else console.log(err.message);
    }
  };

  const onSubmit = async (formData) => {
    // console.log("데이터 확인", formData);
    try {
      if (isValid) {
        formData.type = "user";
        //파일 우선 전송

        if (formData.profileImage.length > 0) {
          const imageFormData = new FormData();
          imageFormData.append("attach", formData.profileImage[0]);

          const fileRes = await axios("/files", {
            method: "post",
            headers: {
              "Content-type": "multipart/form-data",
            },
            data: imageFormData,
          });

          formData.profileImage = fileRes.data.item[0].path;
          console.log("formData 최종=>", formData);

          //회원가입 진행
          const data = await axios.post("/users", formData);
          console.log(data);
          alert("가입 완료되었습니다.");
          navigate("/");
        } else {
          // delete formData.profileImage;
          console.log(formData);
          const data = await axios.post("/users", formData);
          console.log(data);
          alert("가입 완료되었습니다.");
          navigate("/");
        }
      } else {
        alert("이메일 중복 확인을 먼저 진행해주세요.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              defaultValue="류채영"
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              {...register("name", {
                required: "이름을 입력하세요.",
              })}
            />
            {/* {/* <!-- 입력값 검증 에러 출력 --> */}
            {errors.name && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <div className="flex">
              <input
                defaultValue="rcy@market.com"
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="email"
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
              />
              <button
                type="button"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={emailCheck}
              >
                중복 확인
              </button>
            </div>
            {errors.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              defaultValue="11111111"
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호 8자리 이상 입력해주세요.",
                },
              })}
            />
            {/* {/* <!-- 입력값 검증 에러 출력 --> */}
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              {...register("profileImage")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              회원가입
            </button>
            <button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => {
                navigate(-1);
              }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
