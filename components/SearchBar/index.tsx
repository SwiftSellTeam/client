import useFilters from "@/hooks/useFilters";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SuggestionItem from "./suggestionItem";

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
  padding: 0px 15% 0px 10px;
`;

const Suggestion = styled.div`
  width: 90%;
  display: flex;
  flex-flow: column wrap;
  background: white;
  position: absolute;
  animation: scale_suggestion 0.1s;
  transform-origin: top;
  margin-top: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
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
  width: 10%;
  cursor: pointer;
  background: #ee4d2d;
  border: none;
  outline: none;
  border-radius: 2px;
  color: white;
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
  const [isShowSearchBar, setShowSearchBar] = useState(false);
  const [similarKeywords, setSimilarKeywords] = useState<
    Array<SuggestionItemType>
  >([]);
  const router = useRouter();

  const handleOnClick = (suggestion: SuggestionItemType) => {
    Add("keyword", suggestion.keyword.toLowerCase(), false);
  };

  const onSubmit = (e: any) => {
    Add("keyword", searchText, false);
    e.preventDefault();
  };

  useEffect(() => {
    if (currentQueryString != "?" && currentQueryString != "") {
      router.push("/search" + currentQueryString);
    }
  }, [currentQueryString]);

  useEffect(() => {
    if (searchText.trim().length > 2) {
      GetSimilarKeywords();
    } else {
      setSimilarKeywords([]);
    }
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
          onFocus={() => setShowSearchBar(true)}
          onClick={() => setShowSearchBar(true)}
          onBlur={() => {
            setTimeout(() => {
              setShowSearchBar(false);
            }, 100);
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchBTN>Search</SearchBTN>
      </Form>
      {similarKeywords.length > 0 && isShowSearchBar && (
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
