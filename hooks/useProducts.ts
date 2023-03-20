import axios from "axios";
import { useQuery } from "react-query";

export interface GetProductsQueryType {
  page: number;
  keyword: string;
  sortBy: string;
}

const getProducts = async ({ queryKey }: any) => {
  const query: GetProductsQueryType = queryKey[1];
  const response = await axios.get(
    `https://tiki.vn/api/v2/products?limit=40&q=${query.keyword}&page=${query.page}&sort=${query.sortBy}`
  );
  const data = response.data;
  const products: Array<any> = response.data.data;
  return {
    products,
    totalProducts: Number(data.paging.total),
    page: Number(data.paging.current_page),
    totalPage: Number(data.paging.last_page),
  };
};

const useProducts = (query: GetProductsQueryType) => {
  const { data, isLoading, error } = useQuery(
    ["GET_PRODUCT", query],
    getProducts
  );
  return {
    getProductsResponse: data,
    isLoadingProducts: isLoading,
    getProductsError: error,
  };
};

export default useProducts;
