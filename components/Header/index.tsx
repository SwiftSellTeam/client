import styled from "styled-components";
import PaddingContainer from "../PaddingContainer";
import SearchBar from "../SearchBar";
import shopeeLogo from "../../public/download.png";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  height: 120px;
  background: #ee4d2d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background: #ee4d2d;
  z-index: 100;
`;

const Logo = styled.img`
  width: 11%;
  margin-right: 30px;
  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  return (
    <Container>
      <PaddingContainer
        style={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
        }}
      >
        <Logo onClick={() => router.push("/")} src={shopeeLogo.src} />
        <SearchBar />
      </PaddingContainer>
    </Container>
  );
};

export default Header;
