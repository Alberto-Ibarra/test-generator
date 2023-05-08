
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [results, setResults] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Name:", name, "Email:", email)
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name, email})
    })
    const data = await response.json()

    setResults(JSON.stringify(data));
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Enter Name</label>
        <input type="text" className='border border-slate-500' value={name} onChange={e => setName(e.target.value)}/>
      </div>

      <div>
        <label>Enter Email</label>
        <input type="text" className='border border-slate-500' value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
        <button>Test</button>
    </form>
    <p>test</p>
    <div dangerouslySetInnerHTML={{__html: results}}/>
    </>
  )
}
