import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SuggestionItem from "./suggestionItem";
import searchIcon from "../../public/icon/search.png";
import useSuggestions from "@/hooks/useSuggestions";

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

export interface SuggestionItemType {
  keyword: string;
  type: string;
  url: string;
}

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isShowSimilarKeywords, setShowSimilarKeywords] = useState(false);
  const { suggestions, getSuggestionsError, isLoadingSuggestions } =
    useSuggestions(searchText, isShowSimilarKeywords);
  const router = useRouter();

  const handleOnClick = (suggestion: SuggestionItemType) => {
    handleQuery(suggestion.keyword.toLowerCase());
    setShowSimilarKeywords(false);
  };

  const onSubmit = (e: any) => {
    handleQuery(searchText);
    setShowSimilarKeywords(false);
    e.preventDefault();
  };

  const handleQuery = (newKeyword: string) => {
    router.push(`/search?keyword=${newKeyword}&page=1&sort=default`);
  };

  useEffect(() => {
    if (router.query?.keyword) {
      setSearchText(router.query.keyword.toString());
    } else {
      setSearchText("");
    }
  }, [router.query]);

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
          <img alt="search-icon" src={searchIcon.src} />
        </SearchBTN>
      </Form>
      {suggestions &&
        suggestions.length > 0 &&
        !isLoadingSuggestions &&
        isShowSimilarKeywords && (
          <Suggestion>
            {suggestions.map((suggestion: SuggestionItemType) => (
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
