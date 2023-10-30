import React from "react";
import styled from "styled-components";

export const CopyLinkButton: React.FC<{ linkToCopy: string }> = ({
  linkToCopy,
}) => {
  const copyToClipboard = () => {
    const tempInput = document.createElement("input");
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("링크가 복사되었습니다.");
  };

  return <CopyLink onClick={copyToClipboard}>링크 복사</CopyLink>;
};

const CopyLink = styled.button`
  border: none;
  padding: 4px 8px;
  background-color: transparent;
`;