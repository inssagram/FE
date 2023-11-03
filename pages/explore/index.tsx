import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "@/components/input/SearchBar";
import Footer from "@/components/Footer";
import getPostAllAxios from "@/services/postInfo/getPostAll";

interface ExplorePostData {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

const Explore: React.FC = () => {
  const [randomPosts, setRandomPosts] = useState<ExplorePostData[]>([]);
  console.log(randomPosts);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>();
  console.log(searchValue);

  const fetchExplorePostData = async () => {
    try {
      const response = await getPostAllAxios();
      const randomOrderPosts = response.data.sort(() => Math.random() - 0.5);
      setRandomPosts(randomOrderPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchExplorePostData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <Container>
        <ExploreTop>
          <SearchBar onSearch={handleSearch} />
        </ExploreTop>
        <Content>
          {loading ? (
            <Loading>
              <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
            </Loading>
          ) : (
            randomPosts.map((post) => (
              <Link key={post.postId} href={`/explore/${post.postId}`}>
                <Image
                  src="/images/noImage.svg"
                  alt="게시글"
                  width={135}
                  height={135}
                />
              </Link>
            ))
          )}
        </Content>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.section`
  min-height: 870px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  color: #222;
  background-color: #fff;
  // color: #fff;
  // background-color: #000;
`;

const ExploreTop = styled.div`
  padding: 10px 16px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  row-gap: 1px;
  margin-bottom: 10px;
`;

const Loading = styled.div`
  position: absolute;
  top: 25%;
  right: 50%;
`;
export default Explore;
