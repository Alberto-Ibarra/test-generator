import  {Configuration, OpenAIApi} from 'openai'

export default async function handler(req, res) {
  const {selectedOption, subject, keywords} = req.body
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
  console.log(selectedOption);
  const openai = new OpenAIApi(config)

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
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
                I am using talwind css, put questions side by side going down in a column
                `
    }]
  })


    const generatedText = completion.data.choices[0].message.content;
    const formattedText = generatedText.replace(/\n/g, "").replace(/\t/g, "");
    // console.log(typeof(formattedText));

  res.status(200).json(formattedText || "")
  // res.status(200).send(`
  //   <div dangerouslySetInnerHTML={{__html: "${formattedText}"}}></div>
  // `);
}
