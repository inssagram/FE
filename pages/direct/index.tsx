import React from "react";
import * as SC from "./styled";
import DirectHeader from "../../components/atoms/DirectHeader";
import DirectList from "../../components/list/DirectList";

const Direct: React.FC = () => {
  return (
    <SC.Container>
      <DirectHeader />
      <SC.PageTitle>메시지</SC.PageTitle>
      <SC.DirectAccount>
        <DirectList />
        <DirectList />
        <DirectList />
        <DirectList />
      </SC.DirectAccount>
    </SC.Container>
  );
};

export default Direct;
