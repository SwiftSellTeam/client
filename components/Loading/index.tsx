import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count == 4) setCount(1);
  }, [count]);

  const getLoadingContent = () => {
    let content = "Loading ";
    switch (count) {
      case 1:
        content += ".";
        break;
      case 2:
        content += "..";
        break;
      case 3:
        content += "...";
        break;
    }
    return content;
  };

  return (
    <Container>
      <h2>{getLoadingContent()}</h2>
    </Container>
  );
};

export default Loading;
