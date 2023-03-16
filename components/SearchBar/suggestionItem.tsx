import styled from "styled-components";
import { SuggestionItemType } from ".";

type onClickItem<T> = (data: T) => void;

interface Props {
  suggestion: SuggestionItemType;
  onClick: onClickItem<SuggestionItemType>;
}

const Item = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  padding: 0px 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const SuggestionItem: React.FC<Props> = ({ suggestion, onClick }) => {
  return (
    <Item
      onClick={() => {
        onClick(suggestion);
      }}
    >
      {suggestion.keyword}
    </Item>
  );
};

export default SuggestionItem;
