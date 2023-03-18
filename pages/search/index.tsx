import styled from "styled-components";
import PaddingContainer from "@/components/PaddingContainer";
import Filters from "@/components/Filters";
import useFilters from "@/hooks/useFilters";

import ProductsContainer from "@/components/ProductsContainer";
import ProductItem from "@/components/ProductItem";
import Loading from "@/components/Loading";
import TopFilters from "@/components/TopFilters";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
`;

const Search = () => {
  const router = useRouter();
  const { filters, Add, Remove, currentQueryString } = useFilters();
  const { resetAllFilters } = useFilters();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(() => {
      setTimeout(() => setLoading(false), 100);
    }, 500);
    return () => clearTimeout(getData);
  }, [router.query]);

  useEffect(() => {
    return () => {
      resetAllFilters();
    };
  }, []);

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push(currentQueryString, undefined, { scroll: false });
    }
  }, [currentQueryString]);

  return (
    <PaddingContainer>
      <Container>
        <Filters
          filters={filters}
          Add={Add}
          Remove={Remove}
        />
        <ProductsContainer width="80%">
          <TopFilters filters={filters} Add={Add} />
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
