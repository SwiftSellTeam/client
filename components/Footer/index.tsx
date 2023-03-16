import styled from "styled-components";
import PaddingContainer from "../PaddingContainer";

const Container = styled.div`
  width: 100%;
  min-height: 400px;
`;

const Footer = () => {
  return (
    <Container>
      <PaddingContainer>
        <h1>Footer</h1>
      </PaddingContainer>
    </Container>
  );
};

export default Footer;
