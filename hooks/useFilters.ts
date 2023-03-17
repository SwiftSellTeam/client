import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

type ConvertUrlQueryToFiltersType = (
  query: ParsedUrlQuery
) => Map<string, Array<string>>;

type ConvertFiltersToUrlQueryType = (
  filters: Map<string, Array<string>>
) => string;

const useFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<Map<string, Array<string>>>(new Map());
  const [currentQueryString, setCurrentQueryString] = useState<string>("");

  const convertUrlQueryToFilters: ConvertUrlQueryToFiltersType = (query) => {
    let convertedFilters: Map<string, Array<string>> = new Map();
    for (const [key, value] of Object.entries(query)) {
      let filterValues: Array<string> = [];
      if (value) {
        filterValues = value.toString().split(",");
        if (!convertedFilters.has(key)) {
          convertedFilters.set(key, filterValues);
        } else {
          filterValues.forEach((fValue) => {
            convertedFilters.get(key)?.push(fValue);
          });
        }
      }
    }
    return convertedFilters;
  };

  const convertFiltersToUrlQuery: ConvertFiltersToUrlQueryType = (_filters) => {
    let fullQueryString: string = "?";
    let queryStringArr: string[] = [];
    for (const [key, value] of _filters) {
      let queryString: string = `${key}=`;
      value.forEach((valueItem, index) => {
        if (index < value.length - 1) {
          queryString += valueItem + ",";
        } else {
          queryString += valueItem;
        }
      });
      queryStringArr.push(queryString);
    }
    queryStringArr.forEach((queryString, index) => {
      if (index < queryStringArr.length - 1) {
        fullQueryString += queryString + "&";
      } else {
        fullQueryString += queryString;
      }
    });
    return fullQueryString;
  };

  const Add = (slug: string, value: string, isMutiple: boolean = true) => {
    let updatedFilters: Map<string, Array<string>> = new Map(
      JSON.parse(JSON.stringify(Array.from(filters)))
    );
    if (!filters.has(slug)) {
      const values = [value];
      updatedFilters.set(slug, values);
    } else {
      if (isMutiple) {
        updatedFilters.get(slug)?.push(value);
      } else {
        const values = [value];
        updatedFilters.set(slug, values);
      }
    }
    setFilters(updatedFilters);
  };

  const Remove = (slug: string, value: string) => {
    let updatedFilters: Map<string, Array<string>> = new Map(
      JSON.parse(JSON.stringify(Array.from(filters)))
    );
    let updateValues: Array<string> | undefined = updatedFilters.get(slug);
    if (updateValues) {
      updateValues = updateValues.filter((uValue) => uValue != value);
      updatedFilters.set(slug, updateValues);
      setFilters(updatedFilters);
    }
  };

  const resetAllFilters = () => {
    setFilters(new Map());
  };

  useEffect(() => {
    console.log({ filters });
    const updatedQueryString = convertFiltersToUrlQuery(filters);
    setCurrentQueryString(updatedQueryString);
  }, [filters]);

  useEffect(() => {
    if (JSON.stringify(router.query) != "{}") {
      const convertedFilters = convertUrlQueryToFilters(router.query);
      if (convertedFilters.size > 0) {
        setFilters(convertedFilters);
      }
    } else {
      resetAllFilters();
    }
  }, [router, router.query]);

  return {
    currentQueryString,
    filters,
    Add,
    Remove,
    resetAllFilters,
  };
};

export default useFilters;
