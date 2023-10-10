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
      <p onClick={goBack}>
        <FontAwesomeIcon icon={faArrowLeft} fontSize={24} />
      </p>
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
      <p onClick={goBack}>
        <FontAwesomeIcon icon={faChevronLeft} fontSize={24} />
      </p>
    </>
  );
};
