import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const controlActivation = [
  { id: 1, path: "/Today", content: "투데이" },
  { id: 2, path: "/Search", content: "검색" },
  { id: 3, path: "/Feeds", content: "피드" },
  { id: 4, path: "/MyBooks", content: "내서재" },
  { id: 5, path: "/", content: "관리" },
];

function Nav() {
  const [menu, setMenu] = useState(1);
  const history = useHistory();

  return (
    <NavBar>
      <CommonContainer>
        <MainMenu>
          <Link to="/">
            <img src="/images/gnb_logo.png" alt="윌리의 서재 로고" />
          </Link>
          <ul>
            {controlActivation.map((tag, idx) => {
              return (
                <MenuList
                  key={idx}
                  menu={menu}
                  active={tag.id === menu}
                  onClick={() => {
                    setMenu(tag.id);
                    history.push(tag.path);
                  }}
                >
                  {tag.content}
                </MenuList>
              );
            })}
          </ul>
        </MainMenu>
        <UserAction>
          <Action alarm="alarm">
            <AiOutlineBell />
          </Action>
          <Action>
            <BlackBtn
              onClick={() => {
                localStorage.removeItem("Authorization");
                history.push("/Login");
              }}
            >
              로그아웃
            </BlackBtn>
          </Action>
        </UserAction>
      </CommonContainer>
    </NavBar>
  );
}

const BlackBtn = styled.button`
  display: inline-block;
  padding: 7px 17px;
  background: #333;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  color: #fff;
`;

const NavBar = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #eee;
  z-index: 99;
`;

const CommonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
  height: 64px;
  margin: 0 auto;
`;

const MainMenu = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  a {
    display: inline-block;
    width: 63px;
    height: auto;
    margin: 4px 25px 0 0;

    img {
      width: 100%;
    }
  }

  ul {
    display: flex;
  }
`;

const MenuList = styled.li`
  padding: 12px 20px;
  font-size: 20px;
  cursor: pointer;
  font-weight: ${({ active }) => active && "600"};
`;

const UserAction = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Action = styled.li`
  margin-left: 20px;
  font-size: 24px;
`;

export default Nav;
