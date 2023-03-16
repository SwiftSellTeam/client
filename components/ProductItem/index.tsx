import { useState } from "react";
import styled from "styled-components";

interface Props {}

const Container = styled.div`
  position: relative;
  width: 24%;
  background: white;
  display: flex;
  flex-flow: column wrap;
  height: 300px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
  box-sizing: border-box;
  &:hover {
    border-radius: 4px;
    border: 1.5px solid #ee4d2d;
    transform: translate(0, -4px);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  pointer-events: none;
`;

const HoverButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  background: #ee4d2d;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 4px 4px;
  cursor: pointer;
  animation: hover_button_appear 0.2s;
  @keyframes hover_button_appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProductItem: React.FC<Props> = () => {
  const [isHover, setHover] = useState<boolean>(false);
  return (
    <Container
      onClick={(e) => {
        if (e.target == e.currentTarget) {
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ProductImage src="https://product.hstatic.net/1000039900/product/aa_hydro_algae_blue_cleansing_face_wash_gel_1_f0ab8f051e144732ab2d9a9d5e97f31a.jpg" />
      {isHover && (
        <HoverButton onClick={() => {}}>Tìm sản phẩm tương tự</HoverButton>
      )}
    </Container>
  );
};

export default ProductItem;
