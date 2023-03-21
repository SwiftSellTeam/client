import ApiServiceBase from "@/pages/api/ApiServiceBase";
import CONST from "@/utils/CONST";
import axios from "axios";
import { useQuery } from "react-query";

const getSuggestions = async ({ queryKey }: any) => {
  const q = queryKey[1];
  const axios = new ApiServiceBase("https://tiki.vn/api/v2/");
  const data = await axios.get<any>("search/suggestion/", { q });
  const suggestions = data.data;
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
