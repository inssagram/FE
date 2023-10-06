import * as SC from './styled'
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useState, useEffect } from 'react'

const Job = () => {
    const [inputValue, setInputValue] = useState('')
    const [jobList, setJobList] = useState<string[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/job');
            const data = response.data[0];
            const regexPattern = inputValue ? new RegExp(`^${inputValue}`) : null;
            const jobListArr = [];
      
            for (let keys in data) {
              if(regexPattern !== null){
                if (regexPattern.test(data[keys])) {
                  jobListArr.push(data[keys]);
                }
              }
            }
      
            setJobList(jobListArr);
            console.log(inputValue,jobList);
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