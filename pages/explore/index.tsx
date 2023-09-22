import React from "react";
import Image from "next/image";
import * as SC from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../components/input/SearchBar";

const Explore: React.FC = () => {
  return (
    <SC.Container>
      <SC.ExploreTop>
        <SearchBar />
      </SC.ExploreTop>
      <SC.Content>
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
        <Image src="/images/coffee.jpg" alt="게시글" width={135} height={135} />
      </SC.Content>
      <SC.Loading>
        <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
      </SC.Loading>
    </SC.Container>
  );
};

export default Explore;
