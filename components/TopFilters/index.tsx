import useFilters from "@/hooks/useFilters";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface FilterItemType {
  isSelected: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const FilterItem = styled.button<FilterItemType>`
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isSelected ? "var(--secondary-color)" : "black")};
  background: ${(props) =>
    props.isSelected ? "var(--primary-color)" : "white"};
  padding: 0px 20px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  outline: none;
`;

const TopFilters = () => {
  const router = useRouter();
  const { filters, Add, currentQueryString } = useFilters();
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    if (filters.get("sortBy")) {
      setSortBy(filters.get("sortBy")![0]);
    } else {
      setSortBy("relevancy");
    }
  }, [filters]);

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push(currentQueryString, undefined, { scroll: false });
    }
  }, [currentQueryString]);

  return (
    <Container>
      <FilterItem
        onClick={() => Add("sortBy", "relevancy", "single")}
        isSelected={sortBy == "relevancy"}
      >
        Liên Quan
      </FilterItem>
      <FilterItem
        onClick={() => Add("sortBy", "ctime", "single")}
        isSelected={sortBy == "ctime"}
      >
        Mới Nhất
      </FilterItem>
      <FilterItem
        onClick={() => Add("sortBy", "sales", "single")}
        isSelected={sortBy == "sales"}
      >
        Bán Chạy
      </FilterItem>
    </Container>
  );
};

export default TopFilters;
