import { useRouter } from "next/router"
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const BackButton = () => {
    const router = useRouter()
    const backButtonHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        router.back()
    }

    return (
        <>
            <button 
                style={{'color': 'black', 'backgroundColor': 'transparent', 'border':'none'}}
                onClick={backButtonHandler}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
        </>
    )
}