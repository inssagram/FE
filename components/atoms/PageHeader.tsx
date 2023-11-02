import styled from "styled-components";
import { BackChevron } from "@/components/atoms/Icons";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

export const Title = styled.span`
  margin: 0 auto;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const PageHeader: React.FC = ({ title }) => {
  return (
    <Header>
      <BackChevron />
      <Title>{title}</Title>
    </Header>
  );
};

export default PageHeader;
