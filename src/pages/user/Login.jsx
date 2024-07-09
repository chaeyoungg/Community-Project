import useAxios from "@hooks/useAxios.mjs";
import { memberState } from "@recoil/user/atoms";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setUser = useSetRecoilState(memberState);
  // const [user, setUser] = useRecoilState(memberState);
  const axios = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      // console.log("formData", formData);
      const res = await axios.post("/users/login", formData);
      console.log("res", res.data.item);

      setUser({
        _id: res.data.item._id,
        email: res.data.item.email,
        name: res.data.item.name,
        profileImage: res.data.item.profileImage,
        token: res.data.item.token,
      });

      alert(`반갑습니다. ${res.data.item.name}님!`);
      navigate("/");
    } catch (err) {
      if (err.response.status === 403) {
        alert(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              defaultValue="aa@bb.com"
              name="email"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            />
            {errors.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
            {/* <!-- 입력값 검증 에러 출력 --> */}
            {/* <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              defaultValue="11111111"
              name="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호 8자리 이상 입력해주세요.",
                },
              })}
            />
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
            <a
              href="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              로그인
            </button>
            <a
              href="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
