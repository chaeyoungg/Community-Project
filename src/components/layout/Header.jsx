import Theme from "@components/Theme";
import { memberState, typeState } from "@recoil/user/atoms";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

function Header() {
  const [user, setUser] = useRecoilState(memberState);
  const setType = useSetRecoilState(typeState);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("로그아웃 되셨습니다.");
    setUser(null);
    navigate("/");
  };

  const handleClick = (typeParam) => {
    setType(typeParam);
  };

  console.log("user=>", user);
  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <a href="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="/images/favicon.svg"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">멋사컴</span>
          </a>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/info" onClick={() => handleClick("info")}>
                정보공유
              </Link>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/free" onClick={() => handleClick("free")}>
                자유게시판
              </Link>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <Link to="/qna" onClick={() => handleClick("qna")}>
                질문게시판
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {user ? (
            <p className="flex items-center">
              <img
                className="w-8 rounded-full mr-2"
                src={`https://api.fesp.shop/${user.profileImage}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-profile.png";
                }}
              />
              {user.name}
              <button
                type="button"
                className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </p>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => (location.href = "/user/login")}
              >
                로그인
              </button>
              <button
                type="button"
                className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => (location.href = "/user/signup")}
              >
                회원가입
              </button>
            </div>
          )}
          {/*
          <p className="flex items-center">
            <img className="w-8 rounded-full mr-2" src="https://api.fesp.shop/files/00-sample/user-muzi.webp" />
            용쌤님 :)
            <button type="button" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded" onClick={ () => location.href='/user/login' }>로그아웃</button>
          </p>
          */}

          {/* 로그인 전 */}

          {/* 라이트/다크 모드 전환 */}
          <Theme />
        </div>
      </nav>
    </header>
  );
}

export default Header;
