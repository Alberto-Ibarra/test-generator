import { SideBar } from '../components/sidebar/SideBar'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import parse from 'html-react-parser'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [results, setResults] = useState("")
  const [subject, setSubject] = useState("")
  const [keywords, setKeywords] = useState("")
  const [selectedOption, setSelectedOption] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({subject, keywords, selectedOption})
    })
    const data = await response.json()
    setResults(data);
  }

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Subject:</label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={subject} onChange={e => setSubject(e.target.value)}/>
        </div>

        <div>
          <label>Enter Keywords:</label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={e => setKeywords(e.target.value)}/>
        </div>

        <div>
          <label>Select Grade Level</label>
          <select className='border border-slate-500' value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
          </select>
        </div>

          <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">Create Quiz</button>
      </form>
      {/* {parse(results)} */}
      <div dangerouslySetInnerHTML={{__html: results}}></div>

    </div>
  )
}

Home.getSideBar = function getSideBar(page, pageProps){
  return <SideBar {...pageProps}>{page}</SideBar>
}
