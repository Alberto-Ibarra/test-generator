import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain } from "@fortawesome/free-solid-svg-icons"
import {useUser} from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import Image from "next/image"

export const SideBar =({children, posts, postId}) => {
    const {user} = useUser()
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className="flex flex-col text-white overflow-hidden">
                <div className="bg-amber-800 px-2 flex justify-center">
                    <h1 className="text-4xl text-center py-4">QuizKid</h1>
                    <FontAwesomeIcon icon={faBrain} className="text-3xl pt-5"/>
                </div>
                <div className="flex-1 overflow-auto bg-gradient-to-b from-amber-800 to-yellow-300">
                <h2 className="m-4 p-2 bg-slate-800 rounded-full text-center">{posts.length} quizes created</h2>
                    {posts.map(post => (
                        <div className="px-2" key={post._id}>
                            <Link key={post._id} href={`/post/${post._id}`} className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""}`}>
                            {post.title.split("<title>").flatMap((title, index) => (
                                <div key={index}>
                                {title.split("</title>").map((subTitle, subIndex) => (
                                    <div key={`${index}-${subIndex}`} dangerouslySetInnerHTML={{__html: subTitle}} />
                                ))}
                                </div>
                            ))}
                            </Link>
                        </div>
                    ))}
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
            {children}
        </div>
    )
}
