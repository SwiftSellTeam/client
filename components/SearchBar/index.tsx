import useFilters from "@/hooks/useFilters";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SuggestionItem from "./suggestionItem";
import searchIcon from "../../public/icon/search.png";

const Container = styled.div`
  width: 70%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 4px;
  border: none;
  outline: none;
  background: transparent;
  padding: 0px 15% 0px 10px;
  border: 1px solid rgba(23, 73, 77, 0.3);
  cursor: pointer;
  transition: box-shadow 0.1s ease, border 0.1s ease;
  &:focus {
    border: 1px solid rgba(23, 73, 77, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  }
`;

const Suggestion = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background: var(--secondary-color);
  position: absolute;
  animation: scale_suggestion 0.1s;
  transform-origin: top;
  margin-top: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  @keyframes scale_suggestion {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-flow: row wrap;
  position: relative;
  align-items: center;
`;

const SearchBTN = styled.button`
  position: absolute;
  right: 5px;
  height: 35px;
  width: 5%;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 2px;
`;

export type SuggestionItemType = {
  keyword: string;
};

const suggestionSample: Array<SuggestionItemType> = [
  { keyword: "Thú nhồi bông" },
  { keyword: "Điện thoại Xiaomi" },
  { keyword: "Máy bán hàng" },
  { keyword: "Bàn đánh bida" },
  { keyword: "Cây thông Noel" },
  { keyword: "Cây chà là" },
  { keyword: "Cây kẹo mút" },
  { keyword: "Nệm kimdan" },
  { keyword: "Đồng hồ Apple Watch" },
  { keyword: "Đồng hồ Samsung" },
  { keyword: "Đồng hồ Nokia" },
  { keyword: "Đồng hồ Rolex" },
];

const SearchBar = () => {
  const { Add, currentQueryString, filters } = useFilters();
  const [searchText, setSearchText] = useState<string>("");
  const [isShowSimilarKeywords, setShowSimilarKeywords] = useState(false);
  const [similarKeywords, setSimilarKeywords] = useState<
    Array<SuggestionItemType>
  >([]);
  const router = useRouter();

  const handleOnClick = (suggestion: SuggestionItemType) => {
    Add("keyword", suggestion.keyword.toLowerCase(), "single");
    setShowSimilarKeywords(false);
  };

  const onSubmit = (e: any) => {
    Add("keyword", searchText, "single");
    setShowSimilarKeywords(false);
    e.preventDefault();
  };

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push("/search" + currentQueryString);
    }
  }, [currentQueryString]);

  useEffect(() => {
    const getDataKeywords = setTimeout(() => {
      if (searchText.trim().length > 2) {
        GetSimilarKeywords();
      } else {
        setSimilarKeywords([]);
      }
    }, 200);
    return () => clearTimeout(getDataKeywords);
  }, [searchText]);

  useEffect(() => {
    if (filters.has("keyword")) {
      setSearchText(filters.get("keyword")![0]);
    } else {
      setSearchText("");
    }
  }, [filters]);

  const GetSimilarKeywords = () => {
    let results: SuggestionItemType[] = [];
    suggestionSample.forEach((suggestion) => {
      if (suggestion.keyword.toLowerCase().includes(searchText.toLowerCase())) {
        results.push(suggestion);
      }
    });
    setSimilarKeywords(results);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <SearchInput
          onFocus={() => setShowSimilarKeywords(true)}
          onClick={() => setShowSimilarKeywords(true)}
          onBlur={() => {
            setTimeout(() => {
              setShowSimilarKeywords(false);
            }, 150);
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchBTN>
          <img src={searchIcon.src} />
        </SearchBTN>
      </Form>
      {similarKeywords.length > 0 && isShowSimilarKeywords && (
        <Suggestion>
          {similarKeywords.map((suggestion) => (
            <SuggestionItem
              key={suggestion.keyword}
              suggestion={suggestion}
              onClick={handleOnClick}
            />
          ))}
        </Suggestion>
      )}
    </Container>
  );
};

export default SearchBar;
