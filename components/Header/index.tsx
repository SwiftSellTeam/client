import styled from "styled-components";
import PaddingContainer from "../PaddingContainer";
import SearchBar from "../SearchBar";
import shopeeLogo from '../../public/download.png'

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
`;

const Logo = styled.img`
  width: 150px;
`;

const Header = () => {
  return (
    <Container>
      <PaddingContainer>
        <Logo src={shopeeLogo.src} />
        <SearchBar />
      </PaddingContainer>
    </Container>
  );
};

export default Header;
