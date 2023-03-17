import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import PaddingContainer from "../PaddingContainer";

interface Props {
  children: React.ReactNode;
}

const Body = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  background: var(--secondary-color);
`;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};

export default Layout;
