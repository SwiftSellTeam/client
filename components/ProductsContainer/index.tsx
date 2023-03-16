import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  width: string;
}

interface ContainerPropsType {
  width: string;
}

const Container = styled.div<ContainerPropsType>`
  width: ${(props) => props.width};
  align-content: flex-start;
  justify-content: space-between;
  display: flex;
  flex-flow: row wrap;
  background: white;
  padding: 5px 10px;
`;

const ProductsContainer: React.FC<Props> = ({ children, width }) => {
  return <Container width={width}>{children}</Container>;
};

export default ProductsContainer;
