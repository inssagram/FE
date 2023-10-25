import { useRouter } from "next/router";
import PageHeader from "@/components/atoms/PageHeader";

const Tags: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  const pageTitle = `# ${name}`;

  return (
    <>
      <PageHeader title={pageTitle} />
    </>
  );
};

export default Tags;
