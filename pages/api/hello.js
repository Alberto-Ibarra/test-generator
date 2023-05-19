import {Configuration, OpenAIApi} from 'openai'
import { withApiAuthRequired , getSession} from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired (async function handler(req, res) {
  const {user} = await getSession(req, res)
  const client = await clientPromise
  const db = client.db("quizkid")
  
  const {selectedOption, subject, keywords} = req.body

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(config)

  const content = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    messages: [{
      role: "system",
      content: "You are a elementary school quiz generator"
    },{
      role: "user",
      content: `Generate me a quiz for ${selectedOption} grade students, subject: ${subject}, that target the following coma-seperated ${keywords}.
                the content should be formatted in HMTL
                limited to the following SEO-friendly HTML tags: p, h1, h2, strong, li, ol, ul, i, div.
                this is going to be printed and students are gonna write on it. make output as such.
                add a <br> between all tags.
                give more space between qustions so kids can show work.
                create a answer key below all the questions.
                I am using tailwind css, put questions side by side going down in a column and add space between them.
                Make and option to email all questions
                do not show the answers in the questions, only in the answer key.`
    }]
  })

  const generatedText = content.data.choices[0].message.content;

  const titleRespone = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    messages: [{
      role: "system",
      content: "You are a elementary school quiz generator"
    },{
      role: "user",
      content: `Generate me a quiz for ${selectedOption} grade students, subject: ${subject}, that target the following coma-seperated ${keywords}.
                the content should be formatted in HMTL
                limited to the following SEO-friendly HTML tags: p, h1, h2, strong, li, ol, ul, i, div.
                this is going to be printed and students are gonna write on it. make output as such.
                add a <br> between all tags.
                give more space between qustions so kids can show work.
                create a answer key below all the questions.
                I am using tailwind css, put questions side by side going down in a column and add space between them.
                Make and option to email all questions
                do not show the answers in the questions, only in the answer key.`
    }, {
      role: 'assistant',
      content: generatedText
    }, {
      role: 'user',
      content: "Generate appropriate title tag text for the above quiz"
    }]
  })

  const title = titleRespone.data.choices[0].message.content

  const formattedText = generatedText.replace(/\n/g, "").replace(/\t/g, "");

  const post = db.collection("posts").insertOne({
    title: title,
    content: formattedText,
    subject,
    keywords,
    selectedOption,
    userId: user.sub,
    created: new Date()
  })

  res.status(200).json(formattedText || "")
})
