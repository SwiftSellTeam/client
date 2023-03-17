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
    const getData = setTimeout(() => {
      setTimeout(() => setLoading(false), 500);
    }, 1000);
    return () => clearTimeout(getData);
  }, [router.query]);

  return (
    <PaddingContainer>
      <Container>
        <Filters $isLoading={loading} />
        <ProductsContainer width="80%">
          {!loading && (
            <>
              {Array(100)
                .fill(0)
                .map((_, i) => (
                  <ProductItem key={i} />
                ))}
            </>
          )}
          {loading && <Loading />}
        </ProductsContainer>
      </Container>
    </PaddingContainer>
  );
};

export default Search;
