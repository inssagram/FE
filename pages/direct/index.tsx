import React from "react";
import Link from "next/link";
import * as SC from "@/styled/direct";
import DirectHeader from "@/components/atoms/DirectHeader";
import DmAccountsList from "@/components/list/DmAccountsList";

const Direct: React.FC = () => {
  return (
    <SC.Container>
      <DirectHeader />
      <SC.PageTitle>메시지</SC.PageTitle>
      <SC.DirectAccount>
        <Link href="/direct/in">
          <DmAccountsList />
        </Link>
      </SC.DirectAccount>
    </SC.Container>
  );
};

export default Direct;
