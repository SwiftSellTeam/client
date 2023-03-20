import { FilterType } from "@/hooks/useFilters";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import nextIcon from "../../public/icon/next.png";

interface Props {
  filters: Map<string, string[]>;
  width?: string;
  height?: string;
  currentPage: number;
  totalPage: number;
  onNext: () => void;
  onPrev: () => void;
}

interface PagingPropsType {
  width: string;
  height: string;
}

const Paging = styled.div<PagingPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
  width: 35px;
  height: 35px;
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Pagination: React.FC<Props> = ({
  width = "100%",
  height = "100%",
  currentPage = 1,
  totalPage = 1,
  onNext,
  onPrev,
}) => {
  return (
    <Paging width={width} height={height}>
      <PageNumber>
        <span style={{ color: "var(--primary-color)" }}>{currentPage}</span>/
        {totalPage}
      </PageNumber>
      <PagingButton disabled={currentPage == 1} onClick={() => onPrev()}>
        <Image
          style={{ transform: "rotate(180deg)" }}
          width={10}
          height={10}
          src={nextIcon.src}
          alt="back-icon"
        />
      </PagingButton>
      <PagingButton
        disabled={currentPage == totalPage}
        onClick={() => onNext()}
      >
        <Image width={10} height={10} src={nextIcon.src} alt="next-icon" />
      </PagingButton>
    </Paging>
  );
};

export default Pagination;
