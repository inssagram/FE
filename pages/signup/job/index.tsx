import * as SC from "@/components/styled/signup_job";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import { reduceJob } from "../emailState";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Job = () => {
  const BASE_URL = process.env.BASE_URL
  const API_KEY = process.env.JOBLIST_API_KEY;
  const [inputValue, setInputValue] = useState("");
  const [jobList, setJobList] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const register = useSelector((state: registerState) => state.register)


  interface registerState {
    register: {
      email: string,
      password: string,
      nickname: string,
      job: string
    }
  }

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

  const submitButtonHandler = async () => {
    dispatch(reduceJob(inputValue))
    try{
      await axios.post(`${BASE_URL}/signup`, {
        email: register.email,
        password: register.password,
        nickname: register.nickname,
        job: register.job
      })
        alert("계정이 생성되었습니다.");
        router.push("/signin");
      } catch (error) {
        console.log(error);
      }
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
          <SC.Title>직업 입력</SC.Title>
          <SC.Descriptions>본인의 직업을 입력해보세요.</SC.Descriptions>
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
