import useFilters from "@/hooks/useFilters";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import nextIcon from "../../public/icon/next.png";

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

const Paging = styled.div`
  flex: 1;
  height: 35px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;

const PageNumber = styled.div`
  flex: 1;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 35px;
  font-size: 14px;
`;

const PagingButton = styled.button`
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  background: transparent;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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

  const handleSortBy = (value: "relevancy" | "ctime" | "sales") => {
    Add("sortBy", value, "single");
  };

  return (
    <Container>
      <span style={{ fontSize: "14px" }}>Sắp xếp theo</span>
      <FilterItem
        style={{ marginLeft: "20px" }}
        onClick={() => handleSortBy("relevancy")}
        isSelected={sortBy == "relevancy"}
      >
        Liên Quan
      </FilterItem>
      <FilterItem
        onClick={() => handleSortBy("ctime")}
        isSelected={sortBy == "ctime"}
      >
        Mới Nhất
      </FilterItem>
      <FilterItem
        onClick={() => handleSortBy("sales")}
        isSelected={sortBy == "sales"}
      >
        Bán Chạy
      </FilterItem>
      <Paging>
        <PageNumber>
          <span style={{ color: "var(--primary-color)" }}>1</span>/11
        </PageNumber>
        <PagingButton onClick={() => Add("page", "1", "single")}>
          <Image
            style={{ transform: "rotate(180deg)" }}
            width={10}
            height={10}
            src={nextIcon.src}
            alt="back-icon"
          />
        </PagingButton>
        <PagingButton onClick={() => Add("page", "2", "single")}>
          <Image width={10} height={10} src={nextIcon.src} alt="next-icon" />
        </PagingButton>
      </Paging>
    </Container>
  );
};

export default TopFilters;
