import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SC from "./styled";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { faBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Layout from '@/components/Layout'
import { SVGProps, useState } from 'react';
import { useRouter } from 'next/router';


const Main:React.FC = () => {
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false);

    const spinnerHandler = () => {
        setIsAnimating(true);
        setTimeout(() => router.push('/story'), 2000);
    }


    return (
        <Layout>
            <SC.Container>
                <SC.Stories>
                    <SC.Story onClick={spinnerHandler}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%', border: `${isAnimating ? '' : '3px solid red'}`}}
                        />
                            <SC.Spinner>
                            <svg className={`${isAnimating ? 'spinner' : ''}`} width="42px" height="42px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={`${isAnimating ? 'path' : ''}`} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </SC.Spinner>
                        <SC.StoryID>정호다</SC.StoryID>
                    </SC.Story>
                    <SC.Story onClick={spinnerHandler}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%', border: `${isAnimating ? '' : '3px solid red'}`}}
                        />
                            <SC.Spinner>
                            <svg className={`${isAnimating ? 'spinner' : ''}`} width="42px" height="42px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={`${isAnimating ? 'path' : ''}`} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </SC.Spinner>
                        <SC.StoryID>정호다</SC.StoryID>
                    </SC.Story>
                    <SC.Story onClick={spinnerHandler}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%', border: `${isAnimating ? '' : '3px solid red'}`}}
                        />
                            <SC.Spinner>
                            <svg className={`${isAnimating ? 'spinner' : ''}`} width="42px" height="42px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={`${isAnimating ? 'path' : ''}`} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </SC.Spinner>
                        <SC.StoryID>정호다</SC.StoryID>
                    </SC.Story>
                    <SC.Story onClick={spinnerHandler}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%', border: `${isAnimating ? '' : '3px solid red'}`}}
                        />
                            <SC.Spinner>
                            <svg className={`${isAnimating ? 'spinner' : ''}`} width="42px" height="42px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={`${isAnimating ? 'path' : ''}`} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </SC.Spinner>
                        <SC.StoryID>정호다</SC.StoryID>
                    </SC.Story>
                    <SC.Story onClick={spinnerHandler}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%', border: `${isAnimating ? '' : '3px solid red'}`}}
                        />
                            <SC.Spinner>
                            <svg className={`${isAnimating ? 'spinner' : ''}`} width="42px" height="42px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={`${isAnimating ? 'path' : ''}`} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </SC.Spinner>
                        <SC.StoryID>정호다</SC.StoryID>
                    </SC.Story>
                </SC.Stories>
                <SC.Article>
                    <SC.Head>
                        <SC.Profile>
                            <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            width={40}
                            height={40}
                            style={{borderRadius: '100%'}}
                            />
                            <SC.ID>정호다</SC.ID>
                        </SC.Profile>
                        <SC.More>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </SC.More>
                    </SC.Head>
                    <SC.Contents>
                        <SC.ImageContent>
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                                alt="개"
                                layout='responsive'
                                width={10}
                                height={10}
                            />
                        </SC.ImageContent>
                    </SC.Contents>
                    <SC.Details>
                        <SC.Buttons>
                        <SC.LeftIcons>
                            <FontAwesomeIcon icon={faHeart} fontSize={'25px'} />
                            <FontAwesomeIcon icon={faComment} fontSize={'25px'} />
                            <FontAwesomeIcon icon={faPaperPlane} fontSize={'25px'} />
                        </SC.LeftIcons>
                        <SC.RightIcon>
                            <FontAwesomeIcon icon={faBookmark} fontSize={'25px'} />
                        </SC.RightIcon>
                        </SC.Buttons>
                        <SC.Likes>learnupkr님 외 1690명이 좋아합니다</SC.Likes>
                        <SC.Paragraph>kkang.stylist 이번주 목요일21일 19시 kkst에서 니트가 최초공개됩니다👏... 더 보기</SC.Paragraph>
                        <SC.AllComment>댓글 556개 모두 보기</SC.AllComment>
                        <SC.Comment>댓글 달기...</SC.Comment>
                    </SC.Details>
                </SC.Article>
            </SC.Container>
        </Layout>
    )
}

export default Main