# zotcards
*Generative flash-card app developed for ZotHacks 2023.*

## Inspiration
*Studying takes enough effort on its own.*

When brainstorming, we wanted to explore the reasons students might want to study but then give up before starting. Most of us can agree that sometimes even seemingly small barriers can slow us down enough to get us off-task.

The two barriers we identified as most common are:
- Setting a study goal
- Choosing concepts to study

ZotCards breaks through both of those barriers by using the most accessible type of information students have: notes!

## What it does
With ZotCards, studying notes of any conceptual topic is streamlined. 

Once the website is provided with notes, ZotCards invites the user to choose between multiple choice or true/false interactive flash cards. After these couple clicks, ZotHacks generates a set of flash cards to practice with, and your study session begins right away!

The gamified nature of the flash-card quiz format gives students a goal, and the automatic generation makes synthesis of what to study pain-free!

## How we built it
We chose a robust tech stack that would future-proof us with opportunities to improve ZotCards down the line without having to start from the ground up.

Next.js and Flask made up the two-pronged backbone of our web application, and we employed Git and GitHub for version control.

For us, extensive planning was important to ensure a comfortable workflow as the hackathon started. Before the vast majority of active coding, our design lead Jasmine created wireframes on Figma, Dalton created a database structure mockup, Shayan confirmed the APIs would function, and Andrew investigated collaboration software, among many more preparatory steps.

Our division of labor was loosely defined, as we worked in the spirit of collaboration especially when debugging, but Shayan and Jasmine spent a majority of their time on the frontend, while Dalton and Andrew worked more on the backend. Jasmine was our design lead.

## Challenges we ran into
One pain-point was the erratic nature of the OpenAI API's responses. While we were pleased with the quality of the responses, we had to spend time tailoring the prompt in order to net consistent results, which changed the way we parsed the data. For example, we at first asked the LLM to provide us with an array of JSON objects, but it would often separate the elements incorrectly. To solve this, we isolated what the AI was consistently proficient at—creating JSON objects—and resorted to asking it for a JSON of JSONs which we would later parse on the backend. This worked beautifully.

Another pain-point was managing API keys. Since the ChatGPT API has limited utility on the free version, we encountered a multiple brief struggles with permissions. We used Postman to assess the issue with the API, and eventually determined that the API required credit card information (even when using the free version) in order to allow calls.

Also, an anonymous team member was challenged by the lack of good coffee ;)

## Accomplishments that we're proud of

For ZotCards, we are proud of the wide spread of skills demonstrated during our project, particularly in consideration that most members were unfamiliar with at least one part of the tech stack prior to Saturday. For example, though Jasmine was relatively new to react, she was able to effectively develop the frontend with Shayan. 

We are also proud of our collaboration skills, as although we have not known each other very long, we worked together with smooth integration and had a great time! Our problem-solving skills aided each other well; for instance, merge conflicts were relatively rare and quite efficient to resolve with our team.

Finally, we are proud of the robustness of the tech stack.

## What we learned

Most of us gained deeper familiarity with React and version control using Git, which will greatly help us as we continue to collaborate in our careers.

## What's next for ZotCards

For ZotCards, features we have envisioned include the ability to reference and review previously created card sets, a card set sharing feature, pop ups with suggested resources and GPT-generated corrections if you miss a set, more question types (such as vocabulary definitions, in which the OpenAI API would evaluate user answers), etc. 

:)
