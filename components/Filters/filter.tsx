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
  margin-bottom: 30px;
`;

const Header = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const CheckboxItem = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

const ValueText = styled.p`
  padding-left: 10px;
  font-size: 16px;
`;

const ShowMoreBTN = styled.button`
  bottom: 0;
  position: absolute;
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
      }
    }
  }, [filters, slug]);

  const HandleOnClick = (value: string) => {
    if (!selectedValues.includes(value)) {
      Add(slug, value);
    } else {
      Remove(slug, value);
    }
  };

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push(currentQueryString);
    }
  }, [currentQueryString]);

  const renderCheckboxItem = (value: string) => {
    return (
      <CheckboxItem key={value}>
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
        <Container customHeight={isShowMore ? "auto" : "170px"}>
          <Header>{title}</Header>
          {values
            .slice(0, isShowMore ? undefined : 4)
            .map((value) => renderCheckboxItem(value))}
          {!isShowMore && (
            <ShowMoreBTN onClick={() => setShowMore(!isShowMore)}>
              Show more
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
