import { FilterType } from "@/hooks/useFilters";
import styled from "styled-components";
import Filter, { FilterValueItemType } from "./filter";

interface FiltersContainerPropsType {
  $isLoading: boolean;
  Add: (slug: string, value: string, type: FilterType) => void;
  Remove: (slug: string, value: string) => void;
  filters: Map<string, string[]>;
}

const FiltersContainer = styled.div`
  width: 20%;
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

const filterData = [
  {
    slug: "color",
    title: "Màu sắc",
    values: [
      "red",
      "yellow",
      "blue",
      "green",
      "orange",
      "pink",
      "white",
      "black",
      "purple",
      "navy",
    ],
  },
  {
    slug: "category",
    title: "Danh mục",
    values: ["table", "chair", "light"],
  },
];

const Filters: React.FC<FiltersContainerPropsType> = ({
  $isLoading,
  Add,
  Remove,
  filters,
}) => {
  return (
    <FiltersContainer>
      <Header>Bộ lọc tìm kiếm</Header>
      {filterData.map((filterDataItem) => (
        <Filter
          filters={filters}
          Add={Add}
          Remove={Remove}
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
