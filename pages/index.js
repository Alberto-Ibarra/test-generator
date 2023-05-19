import Link from "next/link"
import Image from "next/image"
import SchoolImage from "../public/background.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain } from "@fortawesome/free-solid-svg-icons"


export default function Home(){
    return(
        <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
            <Image src={SchoolImage} fill className="absolute"/>
            <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900 rounded-md backdrop-blur-sm">
                <div className="px-2 flex justify-center">
                    <h1 className="text-4xl text-center py-4">QuizKid</h1>
                    <FontAwesomeIcon icon={faBrain} className="text-3xl pt-5"/>
                </div>
                <p className="py-2">Discover an AI-powered application that creates top-notch quizzes tailored for elementary school students in grades 1-6. With a focus on quality and educational value, our platform generates engaging quizzes that align with the curriculum. Enhance your child's learning journey with interactive quizzes designed to foster knowledge retention and academic growth.</p>
                <Link href="/post/new"><button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded w-full">Get started</button></Link>
            </div>
        </div>
    )
}