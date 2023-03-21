import { FilterType } from "@/hooks/useFilters";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  Add: (slug: string, value: string, type: FilterType) => void;
  filters: Map<string, string[]>;
  width?: string;
  height?: string;
}

interface FilterItemType {
  isSelected: boolean;
}

interface ContainerPropsType {
  width: string;
  height: string;
}

const Container = styled.div<ContainerPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  position: relative;
`;

const FilterItem = styled.button<FilterItemType>`
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isSelected ? "var(--secondary-color)" : "black")};
  background: ${(props) =>
    props.isSelected ? "var(--primary-color)" : "transparent"};
  padding: 0px 20px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 2px;
  box-shadow: ${(props) =>
    props.isSelected ? "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" : "none"};
`;

const TopFilters: React.FC<Props> = ({
  Add,
  filters,
  width = "100%",
  height = "100%",
}) => {
  const [sortBy, setSortBy] = useState<string>("relevancy");

  useEffect(() => {
    if (filters.get("sort")) {
      setSortBy(filters.get("sort")![0]);
    }
    console.log("ENV: ");
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  }, [filters]);

  const handleSortBy = (value: "default" | "newest" | "top_seller") => {
    Add("sort", value, "single");
  };

  return (
    <Container width={width} height={height}>
      <span style={{ fontSize: "14px" }}>Sắp xếp theo</span>
      <FilterItem
        style={{ marginLeft: "20px" }}
        onClick={() => handleSortBy("default")}
        isSelected={sortBy == "default"}
      >
        Liên Quan
      </FilterItem>
      <FilterItem
        onClick={() => handleSortBy("newest")}
        isSelected={sortBy == "newest"}
      >
        Mới Nhất
      </FilterItem>
      <FilterItem
        onClick={() => handleSortBy("top_seller")}
        isSelected={sortBy == "top_seller"}
      >
        Bán Chạy
      </FilterItem>
    </Container>
  );
};

export default TopFilters;
