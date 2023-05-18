import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain } from "@fortawesome/free-solid-svg-icons"
import {useUser} from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import Image from "next/image"


export const SideBar =({children}) => {
    const {user} = useUser()
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col text-white overflow-hidden">
                <div className="bg-amber-800 px-2 flex justify-center">
                    <h1 className="text-4xl text-center py-4">QuizKid</h1>
                    <FontAwesomeIcon icon={faBrain} className="text-3xl pt-5"/>
                </div>
                <div className="flex-1 overflow-auto bg-gradient-to-b from-amber-800 to-yellow-300">
                    
                </div>
                <div className="bg-yellow-300 flex items-center gap-2 border-t border-orange-700/50 h-20 px-2">
                {!!user ? (
                        <>
                            <div className="min-w-[50px]">
                                <Image src={user.picture} alt={user.name} height={50} width={50} className="rounded-full"/>
                            </div>
                            <div className="flex-1">
                                <div className="font-bold">{user.email}</div>
                                <Link href='/api/auth/logout' className="text-sm text-red-500">Logout</Link>
                            </div>
                        </>
                    ) : (
                        <Link href='/api/auth/login'>Login</Link>
                    )}
                </div>
            </div>
            <div className="bg-zinc-50">{children}</div>
        </div>
    )
}
