/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { createContext, useContext, useState } from "react";
import { TwoPartLayout } from "../../components/TwoPartLayout";
import { Content } from "./Content";
import { Menu } from "./Menu";

const evaluationContext = createContext({});

export const useEvaluation = () => {
  return useContext(evaluationContext);
};

export const Evaluation = () => {
  const [section, setSection] = useState("");

  return (
    <evaluationContext.Provider
      value={{
        section,
        setSection,
      }}>
      <TwoPartLayout
        leftRender={() => {
          return <Menu />;
        }}
        rightRender={() => {
          return <Content />;
        }}
      />
    </evaluationContext.Provider>
  );
};
