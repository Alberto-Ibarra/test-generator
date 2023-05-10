import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain } from "@fortawesome/free-solid-svg-icons"

export const SideBar =({children}) => {
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col text-white overflow-hidden">
                <div className="bg-amber-800 px-2 flex justify-center">
                    <h1 className="text-4xl text-center py-4">QuizKid</h1>
                    <FontAwesomeIcon icon={faBrain} className="text-3xl pt-5"/>
                </div>
                <div className="flex-1 overflow-auto bg-gradient-to-b from-amber-800 to-yellow-300"></div>
            </div>
            <div>{children}</div>
        </div>
    )
}
