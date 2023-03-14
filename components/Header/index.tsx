import styled from "styled-components";
import PaddingContainer from "../PaddingContainer";

const Container = styled.div`
  width: 100%;
  height: 120px;
  background: #ee4d2d;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 150x;
  padding-right: 150px;
`;

const Header = () => {
  return (
    <Container>
      <PaddingContainer>
        <h1>Header</h1>
      </PaddingContainer>
    </Container>
  );
};

export default Header;
