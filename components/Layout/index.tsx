import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import PaddingContainer from "../PaddingContainer";

interface Props {
  children: React.ReactNode;
}

const Body = styled.div`
  width: 100%;
  padding-top: 150px;
  padding-bottom: 50px;
`;

const Layout: React.FC<Props> = ({ children = null }) => {
  return (
    <>
      <Header />
      <Body>
        <PaddingContainer>{children}</PaddingContainer>
      </Body>
      <Footer />
    </>
  );
};

export default Layout;
