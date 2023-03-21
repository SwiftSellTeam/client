import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PaddingContainer from "@/components/PaddingContainer";
import Loading from "@/components/Loading";
import useCategories from "@/hooks/useCategories";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    // const { categories } = useCategories();

    // useEffect(() => {
    //   console.log({ categories });
    // }, [categories]);

  return (
    <PaddingContainer>
      <div style={{ height: "1000px" }}></div>
    </PaddingContainer>
  );
}
