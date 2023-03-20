import CONST from "@/utils/CONST";
import axios from "axios";
import { useQuery } from "react-query";

const getSuggestions = async ({ queryKey }: any) => {
  const keyword = queryKey[1];
  const response = await axios.get(
    `https://tiki.vn/api/v2/search/suggestion?q=${keyword}`
  );
  const suggestions = response.data.data;
  return suggestions;
};

const useSuggestions = (keyword: string, isTrigger: boolean) => {
  const { data, isLoading, error } = useQuery(
    [CONST.REACT_QUERY_KEYS.GET_SUGGESTIONS, keyword],
    getSuggestions,
    { enabled: keyword.length > 2 && isTrigger }
  );
  return {
    suggestions: data,
    isLoadingSuggestions: isLoading,
    getSuggestionsError: error,
  };
};

export default useSuggestions;
