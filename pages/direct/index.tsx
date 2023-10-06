import React from "react";
import * as SC from "@/styled/direct";
import DirectHeader from "@/components/atoms/DirectHeader";
import DmAccountsList from "@/components/list/DmAccountsList";

const Direct: React.FC = () => {
  return (
    <SC.Container>
      <DirectHeader />
      <SC.PageTitle>메시지</SC.PageTitle>
      <SC.DirectAccount>
        <DmAccountsList />
        <DmAccountsList />
        <DmAccountsList />
        <DmAccountsList />
      </SC.DirectAccount>
    </SC.Container>
  );
};

export default Direct;
