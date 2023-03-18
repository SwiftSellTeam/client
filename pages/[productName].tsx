import PaddingContainer from "@/components/PaddingContainer";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background: pink;
`;

const ProductDetails = (data: any) => {
  const [isLoading, setLoading] = useState<boolean>(true);

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

  const renderProductDetails = (): React.ReactNode => {
    return <Container></Container>;
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
