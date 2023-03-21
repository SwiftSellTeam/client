import ApiServiceBase from "@/pages/api/ApiServiceBase";
import CONST from "@/utils/CONST";
import { useQuery } from "react-query";

interface GetCategoriesResponseType {
  statusCode: number;
  data: Array<any>;
}

const getCategories = async () => {
  const axios = new ApiServiceBase();
  const response = await axios.get<GetCategoriesResponseType>("categories");
  return response.data;
};

const useCategories = () => {
  const { data, isError, isLoading } = useQuery(
    [CONST.REACT_QUERY_KEYS.GET_CATEGORIES],
    getCategories
  );
  return {
    categories: data,
    isLoadingCategories: isLoading,
    getCategoriesError: isError,
  };
};

export default useCategories;
