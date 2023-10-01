import DirectInHeader from "../../../components/atoms/DirectInHeader";
import DirectPartner from "../../../components/atoms/DirectPartner";
import DirectMessage from "../../../components/input/DirectMessage";
import DmContentsList from "../../../components/list/DmContentsList";

const In: React.FC = () => {
  return (
    <>
      <DirectInHeader />
      <DirectPartner />
      <DmContentsList />
      <DirectMessage />
    </>
  );
};

export default In;
