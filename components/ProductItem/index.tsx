import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { StarFilled } from "@ant-design/icons";
import { Rate } from "antd";
import { formatLongString } from "../../utils/functions";
import { useRouter } from "next/router";

interface Props {
  productName?: string;
}

interface HoverButtonPropsType {
  isHover: boolean;
}

const Container = styled.div`
  position: relative;
  width: 19%;
  background: var(--secondary-color);
  display: flex;
  flex-flow: column wrap;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
  box-sizing: border-box !important;
  border: 1px solid transparent;
  &:hover {
    border-radius: 4px;
    border: 1px solid var(--primary-color);
    transform: translate(0, -4px);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  pointer-events: none;
`;

const HoverButton = styled.button<HoverButtonPropsType>`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  background: var(--primary-color);
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  margin-top: 5px;
`;

const ProductName = styled.div`
  width: 100%;
  font-size: 14px;
  padding: 10px 10px;
  color: rgba(0, 0, 0, 0.8);
`;

const Price = styled.div`
  width: 100%;
  padding: 0px 10px;
  color: var(--primary-color);
  font-size: 15px;
`;

const ProductItem: React.FC<Props> = ({
  productName = "COMBO Dưỡng Da Ngày và Đêm Sắc Ngọc Khang gồm (Kem dưỡng da ban đêm 30g+ Kem dưỡng da ban ngày 30g)",
}) => {
  const router = useRouter();
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <Container
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          router.push("/asd");
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ProductImage src="https://product.hstatic.net/1000039900/product/aa_hydro_algae_blue_cleansing_face_wash_gel_1_f0ab8f051e144732ab2d9a9d5e97f31a.jpg" />
      <ProductName>{formatLongString(productName, 40)}</ProductName>
      <Price>₫268.730</Price>
      <Rate
        disabled
        character={<StarFilled />}
        style={{
          fontSize: "10px",
          padding: "10px",
          display: "flex",
          flexFlow: "row wrap",
          width: "100%",
        }}
        value={4}
      />
      <HoverButton isHover={isHover} onClick={() => {}}>
        Tìm sản phẩm tương tự
      </HoverButton>
    </Container>
  );
};

export default ProductItem;
