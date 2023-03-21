import ApiServiceBase from "@/pages/api/ApiServiceBase";
import CONST from "@/utils/CONST";
import axios from "axios";
import { useQuery } from "react-query";

export interface GetProductsQueryType {
  page: number;
  q: string;
  sort: string;
  limit: number;
}

const getProducts = async ({ queryKey }: any) => {
  const query: GetProductsQueryType = queryKey[1];
  const axios = new ApiServiceBase("https://tiki.vn/api/v2/");
  const data: any = await axios.get("products", query);
  const products: Array<any> = data.data;
  console.log({ products });
  return {
    products,
    totalProducts: Number(data.paging.total),
    page: Number(data.paging.current_page),
    totalPage: Number(data.paging.last_page),
  };
};

const useProducts = (query: GetProductsQueryType) => {
  const { data, isLoading, error } = useQuery(
    [CONST.REACT_QUERY_KEYS.GET_PRODUCTS, query],
    getProducts,
    {
      enabled: query.q.trim().length > 0,
    }
  );
  return {
    getProductsResponse: data,
    isLoadingProducts: isLoading,
    getProductsError: error,
  };
};

export default useProducts;
