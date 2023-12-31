import { useRouter } from "next/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps {
  icon: any;
}

const BackButton: React.FC<BackButtonProps> = ({ icon }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <button type="button" onClick={goBack}>
      <Icon icon={icon} />
    </button>
  );
};

export const BackArrow = () => {
  return <BackButton icon={faArrowLeft} />;
};

export const BackChevron = () => {
  return <BackButton icon={faChevronLeft} />;
};

const Icon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
