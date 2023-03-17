import styled from "styled-components";
import PaddingContainer from "@/components/PaddingContainer";
import Filters from "@/components/Filters";
import useFilters from "@/hooks/useFilters";
import { useEffect, useState } from "react";
import ProductsContainer from "@/components/ProductsContainer";
import ProductItem from "@/components/ProductItem";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [router.query]);

  return (
    <PaddingContainer>
      <Container>
        <Filters $isLoading={loading} />
        <ProductsContainer width="80%">
          {!loading && (
            <>
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </>
          )}
          {loading && <Loading />}
        </ProductsContainer>
      </Container>
    </PaddingContainer>
  );
};

export default Search;
