import useFilters from "@/hooks/useFilters";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Filter, { FilterValueItemType } from "./filter";
import ReactLoading from "react-loading";

interface FiltersContainerPropsType {
  $isLoading: boolean;
}

const FiltersContainer = styled.div`
  width: 20%;
  padding: 10px;
  position: relative;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
  margin-bottom: 30px;
`;

const BlockPanel = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 5;
  cursor: not-allowed;
  display: flex;
  padding-top: 100px;
  justify-content: center;
  border-radius: 4px;
`;

const valuesSample: Array<FilterValueItemType> = [
  { text: "test 1", isChecking: true },
  { text: "test 2", isChecking: false },
  { text: "test 3", isChecking: true },
  { text: "test 4", isChecking: false },
  { text: "test 5", isChecking: false },
  { text: "test 6", isChecking: false },
  { text: "test 7", isChecking: false },
  { text: "test 8", isChecking: false },
];

const filterData = [
  {
    slug: "color",
    title: "Màu sắc",
    values: ["red", "yellow", "blue", "green", "orange"],
  },
  {
    slug: "category",
    title: "Danh mục",
    values: ["table", "chair", "light"],
  },
];

const valuesSample2: Array<FilterValueItemType> = [
  { text: "test 1", isChecking: true },
  { text: "test 2", isChecking: false },
  { text: "test 3", isChecking: true },
];

const Filters: React.FC<FiltersContainerPropsType> = ({ $isLoading }) => {
  const { filters } = useFilters();
  const [filterArr, setFilterArr] = useState([]);

  useEffect(() => {}, [filters]);

  return (
    <FiltersContainer>
      <Header>Bộ lọc tìm kiếm</Header>
      {$isLoading && (
        <BlockPanel>
          <ReactLoading
            type="spin"
            color="var(--primary-color)"
            width={"20%"}
          />
        </BlockPanel>
      )}
      {filterData.map((filterDataItem) => (
        <Filter
          key={filterDataItem.slug}
          title={filterDataItem.title}
          slug={filterDataItem.slug}
          values={filterDataItem.values}
        />
      ))}
    </FiltersContainer>
  );
};

export default Filters;
