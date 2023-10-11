import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as SC from "@/styled/explore";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "@/components/input/SearchBar";
import Footer from "@/components/Footer";

interface Post {
  id: number;
  title: string;
  imageUrl: string;
}

const Explore: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Post[]>("http://localhost:3001/explores")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SC.Container>
        <SC.ExploreTop>
          <SearchBar onSearch={function (searchValue: string): void {}} />
        </SC.ExploreTop>
        <SC.Content>
          {loading ? (
            <SC.Loading>
              <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
            </SC.Loading>
          ) : (
            posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={134}
                  height={135}
                />
              </Link>
            ))
          )}
        </SC.Content>
      </SC.Container>
      <Footer />
    </>
  );
};

export default Explore;
