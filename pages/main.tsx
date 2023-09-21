import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SC from '../styles/main' 
import Image from 'next/image'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { faBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";


export default function Main(){
    return (
        <SC.Container>
            <SC.Article>
                <SC.Head>
                    <SC.Profile>
                        <SC.ProfileImage>
                            <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                            alt="개"
                            layout="fill"
                            style={{borderRadius: '100%'}}
                            />
                        </SC.ProfileImage>
                        <SC.ID>정호다</SC.ID>
                    </SC.Profile>
                    <SC.More>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </SC.More>
                </SC.Head>
                <SC.Contents>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg"
                        alt="개"
                        layout="fill"
                        />
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
    )
}
