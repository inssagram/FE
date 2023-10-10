import * as SC from '@/styled/signup_job'
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useState, useEffect } from 'react'

const Job = () => {
    const API_KEY = process.env.JOBLIST_API_KEY;
    const [inputValue, setInputValue] = useState('')
    const [jobList, setJobList] = useState<string[]>([]);

    interface JobData {
      job: string;
    }

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const encodedString = encodeURIComponent(inputValue)
            const response = await axios.get(`https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=JOB&contentType=json&gubun=job_dic_list&searchJobNm=${encodedString}`);
            const data: JobData[] = response.data.dataSearch.content
            const regexPattern = inputValue ? new RegExp(`^${inputValue}`) : null;
            console.log(data)
            const jobListArr: string[] = [];
            for(let i in data){
              if(regexPattern !== null && regexPattern.test(data[i].job)){
                jobListArr.push(data[i].job)
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
    
    
    const jobListHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        }
      
      const jobShorcutHandler = (job: string) => {
        setInputValue(job)
      }

            return(
                <>
            <SC.Header>
                <FontAwesomeIcon icon={faChevronLeft}/>
                <span>등록</span>
                <span></span>
            </SC.Header>
            <SC.Container>
                <SC.Contents>
                    <SC.Title>직업 입력</SC.Title>
                    <SC.Descriptions>
                        본인의 직업을 입력해보세요.
                    </SC.Descriptions>
                    <SC.InputBox>
                        <SC.JobInput 
                            type="text" placeholder='직업을 입력하세요'
                            onChange={jobListHandler} value={inputValue}
                        ></SC.JobInput>
                        <SC.JobList>
                          {jobList.length > 0 && jobList.map(v => 
                            <>
                              <SC.JobName onClick={(e: React.MouseEvent<HTMLLIElement>) => jobShorcutHandler(v)}>{v}</SC.JobName>
                            </>
                            ) }
                        </SC.JobList>
                      </SC.InputBox>
                    <SC.SubmitButton>다음</SC.SubmitButton>
                </SC.Contents>
            </SC.Container>
            </>
        )
    }

    export default Job