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
import axios from "axios";
import Pagination from "@/components/Pagination";
import useProducts, { GetProductsQueryType } from "@/hooks/useProducts";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
`;

const Top = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  flex-flow: row wrap;
`;

interface Props {
  data: string;
}

const Search: React.FC<Props> = () => {
  const router = useRouter();
  const [query, setQuery] = useState<GetProductsQueryType>({
    page: 1,
    keyword: "",
    sortBy: "default",
  });
  const { getProductsResponse, getProductsError, isLoadingProducts } =
    useProducts(query);
  const { filters, Add, Remove, currentQueryString } = useFilters();
  const { resetAllFilters } = useFilters();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    resetAllFilters();
  }, []);

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push(currentQueryString, undefined, { scroll: false });
    }
  }, [currentQueryString]);

  useEffect(() => {
    let page = 1;
    let keyword = "";
    let sortBy = "default";
    if (filters.has("page")) {
      page = Number(filters.get("page")![0]);
      setCurrentPage(Number(filters.get("page")![0]));
    }
    if (filters.has("keyword")) {
      keyword = filters.get("keyword")![0];
    }
    if (filters.has("sort")) {
      sortBy = filters.get("sort")![0];
    }
    console.log(page, keyword, sortBy);
    setQuery({ page, keyword, sortBy });
  }, [filters]);

  useEffect(() => {
    if (getProductsResponse) {
      setTotalPage(getProductsResponse.totalPage);
    }
  }, [getProductsResponse]);

  const onNext = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      Add("page", nextPage.toString(), "single");
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      Add("page", prevPage.toString(), "single");
    }
  };

  return (
    <PaddingContainer>
      <Container>
        <Filters filters={filters} Add={Add} Remove={Remove} />
        <ProductsContainer width="80%">
          <Top style={{ marginBottom: "20px" }}>
            <TopFilters width="70%" filters={filters} Add={Add} />
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              width="30%"
              onNext={onNext}
              onPrev={onPrev}
              filters={filters}
            />
          </Top>
          {!isLoadingProducts && (
            <>
              {getProductsResponse?.products.map((item, i) => (
                <ProductItem item={item} key={i} />
              ))}
            </>
          )}
          {isLoadingProducts && <Loading />}
        </ProductsContainer>
      </Container>
    </PaddingContainer>
  );
};

export default Search;
