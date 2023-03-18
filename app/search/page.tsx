import styled from "styled-components";
import PaddingContainer from "@/components/PaddingContainer";
import Filters from "@/components/Filters";
import useFilters from "@/hooks/useFilters";
import { useEffect, useState } from "react";
import ProductsContainer from "@/components/ProductsContainer";
import ProductItem from "@/components/ProductItem";
import Loading from "@/components/Loading";
import TopFilters from "@/components/TopFilters";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
`;

const Search = () => {
  const router = useRouter();
  const { filters } = useFilters();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(() => {
      setTimeout(() => setLoading(false), 100);
    }, 500);
    return () => clearTimeout(getData);
  }, [router.query]);

  return (
    <PaddingContainer>
      <Container>
        <Filters $isLoading={loading} />
        <ProductsContainer width="80%">
          <TopFilters />
          {!loading && (
            <>
              {Array(20)
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
