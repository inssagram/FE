import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const BackArrow = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Button type="button" onClick={goBack}>
        <Icon icon={faArrowLeft} />
      </Button>
    </>
  );
};

export const BackChevron = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Button type="button" onClick={goBack}>
        <Icon icon={faChevronLeft} />
      </Button>
    </>
  );
};

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
