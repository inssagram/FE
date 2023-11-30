import * as SC from "@/components/styled/signup_job";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "@/src/redux/Posts/userSlice";

const Job = () => {
  const API_KEY = process.env.JOBLIST_API_KEY;
  const [inputValue, setInputValue] = useState("");
  const [jobList, setJobList] = useState<string[]>([]);
  const router = useRouter();
  const member = useSelector((state) => state.user.member);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  interface JobData {
    job: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedString = encodeURIComponent(inputValue);
        const response = await axios.get(
          `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=JOB&contentType=json&gubun=job_dic_list&searchJobNm=${encodedString}`
        );
        const data: JobData[] = response.data.dataSearch.content;
        const regexPattern = inputValue ? new RegExp(`^${inputValue}`) : null;
        const jobListArr: string[] = [];
        for (let i in data) {
          if (regexPattern !== null && regexPattern.test(data[i].job)) {
            jobListArr.push(data[i].job);
          }
        }
        setJobList(jobListArr);
        // console.log(inputValue,jobList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [inputValue]);

  const jobListHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const jobShorcutHandler = (job: string) => {
    setInputValue(job);
  };

  const submitButtonHandler = () => {
    // Check if member and token are valid before making the API call
    if (!member || !member.member_id || !token) {
      console.error("Invalid member or token");
      return;
    }

    axios
      .put(
        `http://3.36.239.69:8080/member/update/${member.member_id}`,
        {
          companyName: inputValue,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(() => {
        dispatch(loginUser({ ...member, job: inputValue }));
        alert("직업 변경이 완료되었습니다.");
        router.push("/my");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  

  return (
    <>
      <SC.Header>
        <BackArrow></BackArrow>
        <span>등록</span>
        <span></span>
      </SC.Header>
      <SC.Container>
        <SC.Contents>
          <SC.Title>변경할 직업 입력</SC.Title>
          <SC.Descriptions>변경할 직업을 입력해보세요</SC.Descriptions>
          <SC.InputBox>
            <SC.JobInput
              type="text"
              placeholder="직업을 입력하세요"
              onChange={jobListHandler}
              value={inputValue}
            ></SC.JobInput>
            <SC.JobList>
              {jobList.length > 0 &&
                jobList.map((v) => (
                  <>
                    <SC.JobName
                      onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                        jobShorcutHandler(v)
                      }
                    >
                      {v}
                    </SC.JobName>
                  </>
                ))}
            </SC.JobList>
          </SC.InputBox>
          <SC.SubmitButton onClick={submitButtonHandler}>다음</SC.SubmitButton>
        </SC.Contents>
      </SC.Container>
    </>
  );
};

export default Job;
