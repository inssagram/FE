import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import * as SC from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Item {
  id: number;
  type: "account" | "hashtag";
  name: string;
  userId: string;
  desc: string;
  profileUrl: string;
}

const SearchList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [results, setResults] = useState<Item[]>([]);
  console.log(results);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);

      axios
        .get<Item[]>(`http://localhost:3001/accounts`)
        .then((response) => response.data)
        .then((data) => {
          const filteredResults = data.filter(
            (item) =>
              item.type === "account" && item.userId.startsWith(searchTerm)
          );
          setResults(filteredResults);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
          setIsLoading(false);
        });

      axios
        .get<Item[]>(`http://localhost:3001/hashtags`)
        .then((response) => response.data)
        .then((data) => {
          const filteredResults = data.filter(
            (item) =>
              item.type === "hashtag" && item.name.startsWith(searchTerm)
          );
          setResults((prevResults) => [...prevResults, ...filteredResults]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  if (isLoading) {
    return (
      <SC.Loading>
        <FontAwesomeIcon icon={faSpinner} fontSize={"25px"} />
      </SC.Loading>
    );
  }

  return (
    <>
      {results.map((result: Item) => (
        <Link
          key={result.id}
          href={
            result.type === "account"
              ? "/my"
              : `/explore/tags/${encodeURIComponent(result.name)}`
          }
        >
          {result.type === "account" ? (
            <SC.Account>
              <SC.Profile>
                <Image
                  src={result.profileUrl}
                  alt="프로필"
                  width={44}
                  height={44}
                />
              </SC.Profile>
              <SC.Info>
                <SC.Name>{result.userId}</SC.Name>
                <SC.Desc>{result.desc}</SC.Desc>
              </SC.Info>
            </SC.Account>
          ) : (
            <SC.Hashtag>
              <SC.HashtagImg>
                <Image
                  src={result.profileUrl}
                  alt="해시태그"
                  width={16}
                  height={16}
                />
              </SC.HashtagImg>
              <SC.Info>
                <SC.Name>#{result.name}</SC.Name>
                <SC.Desc>{result.desc}</SC.Desc>
              </SC.Info>
            </SC.Hashtag>
          )}
        </Link>
      ))}
    </>
  );
};

export default SearchList;
