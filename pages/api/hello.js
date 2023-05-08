import  {Configuration, OpenAIApi} from 'openai'

export default async function handler(req, res) {
  const {name, email} = req.body
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(config)

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 1,
    messages: [{
      role: "system",
      content: "You are a elementary school test generator"
    },{
      role: "user",
      content: `Generate me a test for 1st grade math students, that target the following coma-seperated addition, subtraction.
                the content should be formatted in SEO-friendly HMTL
                limited to the following HTML tags: p, h1, h2, strong, li, ol, ul, i, div`
    }]
  })
  
  res.status(200).json(completion.data.choices[0].message);
  // res.status(200).json({ message: `Hello, ${name} **${email}**` })
}
