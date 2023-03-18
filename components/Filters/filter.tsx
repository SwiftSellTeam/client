import useFilters from "@/hooks/useFilters";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export interface FilterValueItemType {
  text: string;
  isChecking: boolean;
}

interface Props {
  title: string;
  slug: string;
  values: Array<string>;
}

interface ContainerPropsType {
  customHeight: string;
}

const Container = styled.div<ContainerPropsType>`
  width: 100%;
  display: flex;
  height: ${(props) => `${props.customHeight}`};
  flex-flow: column wrap;
  overflow: hidden;
  transition: height 0.25s ease;
  position: relative;
  margin-bottom: 40px;
`;

const Header = styled.div`
  width: 100%;
  padding-bottom: 15px;
  font-size: 16px;
  color: black;
`;

const CheckboxItem = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--primary-color);
  pointer-events: none;
`;

const ValueText = styled.p`
  padding-left: 10px;
  font-size: 14px;
  text-transform: capitalize;
  color: rgba(0, 0, 0, 0.8);
`;

const ShowMoreBTN = styled.button`
  bottom: 0;
  position: absolute;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  color: rgba(0, 0, 0, 0.8);
`;

const Filter: React.FC<Props> = ({ title = "My Title", slug, values }) => {
  const router = useRouter();
  const { filters, Add, Remove, currentQueryString } = useFilters();
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);
  const [isShowMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    if (slug && filters) {
      if (filters.has(slug)) {
        if (filters.get(slug)) {
          const _selectedValues: string[] | undefined = filters.get(slug);
          if (_selectedValues) {
            setSelectedValues(_selectedValues);
          }
        }
      } else {
        setSelectedValues([]);
      }
    }
  }, [filters, slug]);

  const HandleOnClick = (value: string) => {
    if (!selectedValues.includes(value)) {
      Add(slug, value, "mutiple");
    } else {
      Remove(slug, value);
    }
  };

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push(currentQueryString, undefined, { scroll: false });
    }
  }, [currentQueryString]);

  const renderCheckboxItem = (value: string) => {
    return (
      <CheckboxItem onClick={() => HandleOnClick(value)} key={value}>
        <Checkbox
          checked={selectedValues.includes(value)}
          onChange={() => HandleOnClick(value)}
          type="checkbox"
        />
        <ValueText>{value}</ValueText>
      </CheckboxItem>
    );
  };

  return (
    <>
      {values.length > 4 ? (
        <Container customHeight={isShowMore ? "auto" : "180px"}>
          <Header>{title}</Header>
          {values
            .slice(0, isShowMore ? undefined : 4)
            .map((value) => renderCheckboxItem(value))}
          {!isShowMore && (
            <ShowMoreBTN onClick={() => setShowMore(!isShowMore)}>
              Thêm
            </ShowMoreBTN>
          )}
        </Container>
      ) : (
        <Container customHeight={"auto"}>
          <Header>{title}</Header>
          {values.map((value) => renderCheckboxItem(value))}
        </Container>
      )}
    </>
  );
};

export default Filter;
