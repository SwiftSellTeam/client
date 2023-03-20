import PaddingContainer from "@/components/PaddingContainer";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import styled from "styled-components";
import nextIcon from "../public/icon/next.png";
import nextWhiteIcon from "../public/icon/next-white.svg";

interface SlideItemPropsType {
  isSelected: boolean;
  imageSrc: string;
}

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background: pink;
`;

const ProductImageSlider = styled.div`
  width: 45%;
  height: 580px;
  background: var(--secondary-color);
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;

const CurrentImageContainer = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentProductImage = styled.img`
  width: 80%;
`;

const ImagesContainer = styled.div`
  height: 90px;
  display: flex;
  flex-flow: row wrap;
  position: relative;
`;

const SlideItem = styled.div<SlideItemPropsType>`
  width: 20%;
  height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  background-image: url("${(props) => props.imageSrc}");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  border: ${(props) =>
    props.isSelected
      ? "2px solid var(--primary-color)"
      : "2px solid transparent"};
`;

const SlideControlContainer = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0px 2.5px;
  button {
    height: 30px;
    width: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    background: var(--primary-color);
    color: var(--secondary-color);
    font-size: 13px;
    padding: 5px 10px;
    border-radius: 50%;
    filter: brightness(60%);
    transition: filter 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      filter: brightness(100%);
    }
  }
`;

interface ImageItemType {
  id: number;
  url: string;
}

const images: Array<ImageItemType> = [
  {
    id: 1,
    url: "https://chamsocdidong.com/uploads/2020/03/check-thong-tin-iphone-x.jpg",
  },
  {
    id: 2,
    url: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/p/h/photo_2022-09-28_21-58-51_4.jpg",
  },
  {
    id: 3,
    url: "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/286885732.jpeg",
  },
  {
    id: 4,
    url: "https://media.4rgos.it/i/Argos/sb-2722-m0014-m007-m050-asym-m008-m022-apple-iphone-brandshop-iphone14-pro-v2?maxW=1200&qlt=75&fmt.jpeg.interlaced=true",
  },
  {
    id: 5,
    url: "https://www.cnet.com/a/img/resize/c87d5ee9564eb3a22aaded15f52c711666cc8f54/hub/2022/10/14/1a0dd865-7e11-4bd1-9d6d-6ffaffd9b7f6/20220916-iphone-14-pro-01.jpg?auto=webp&fit=crop&height=528&width=940",
  },
  {
    id: 6,
    url: "https://s.yimg.com/uu/api/res/1.2/3mZ4MxewaZPsVk.zSZcSiQ--~B/Zmk9ZmlsbDtoPTEzNjU7dz0yNDcwO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-10/843fd250-1279-11eb-9df7-f0948508264f.cf.jpg",
  },
  {
    id: 7,
    url: "https://cdn.mos.cms.futurecdn.net/kWcJaVDKbrd548xLhKfWcc.jpg",
  },
  {
    id: 8,
    url: "https://9to5mac.com/wp-content/uploads/sites/6/2022/01/iphone-14-news-design.jpg?quality=82&strip=all",
  },
];

const ProductDetails = (data: any) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentImgId, setCurrentImgId] = useState<number>(1);
  const [currentRangeItem, setCurrentRangeItem] = useState<[number, number]>([
    0, 5,
  ]);

  useEffect(() => {
    if (data?.data != null) {
      setTimeout(() => setLoading(false), 3000);
    }
  }, [data]);

  const renderLoading = (): React.ReactNode => {
    return (
      <span
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading color="var(--primary-color)" />
      </span>
    );
  };

  const handleOnChangeImageSlide = (type: "PREV" | "NEXT") => {
    switch (type) {
      case "PREV":
        if (currentRangeItem[0] > 0) {
          setCurrentRangeItem([
            currentRangeItem[0] - 1,
            currentRangeItem[1] - 1,
          ]);
        }
        break;
      case "NEXT":
        if (currentRangeItem[1] < images.length) {
          setCurrentRangeItem([
            currentRangeItem[0] + 1,
            currentRangeItem[1] + 1,
          ]);
        }
        break;
    }
  };

  const renderProductDetails = (): React.ReactNode => {
    return (
      <Container>
        <ProductImageSlider>
          <CurrentImageContainer>
            <CurrentProductImage
              alt="current-product-img"
              src={images.find((image) => image.id == currentImgId)?.url}
            />
          </CurrentImageContainer>
          <ImagesContainer>
            <SlideControlContainer>
              <button
                style={{ pointerEvents: "fill", transform: "rotate(180deg)" }}
                onClick={() => handleOnChangeImageSlide("PREV")}
              >
                <img
                  alt="prev-icon"
                  style={{ width: "100%" }}
                  src={nextWhiteIcon.src}
                />
              </button>
              <button
                style={{ pointerEvents: "fill" }}
                onClick={() => handleOnChangeImageSlide("NEXT")}
              >
                <img
                  alt="next-icon"
                  style={{ width: "100%" }}
                  src={nextWhiteIcon.src}
                />
              </button>
            </SlideControlContainer>
            {images
              .slice(currentRangeItem[0], currentRangeItem[1])
              .map((item) => (
                <SlideItem
                  onMouseEnter={() => setCurrentImgId(item.id)}
                  isSelected={currentImgId == item.id}
                  key={item.id}
                  imageSrc={item.url}
                />
              ))}
          </ImagesContainer>
        </ProductImageSlider>
      </Container>
    );
  };

  return (
    <PaddingContainer style={{ minHeight: "100vh" }}>
      {isLoading ? renderLoading() : renderProductDetails()}
    </PaddingContainer>
  );
};

export async function getServerSideProps(context: {
  params: { productName: string };
}) {
  return { props: { data: context.params.productName } };
}

export default ProductDetails;
