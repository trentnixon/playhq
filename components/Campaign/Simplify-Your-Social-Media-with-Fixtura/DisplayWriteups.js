import { Paper, ScrollArea } from "@mantine/core";
import ReactMarkdown from "react-markdown";
export const DisplayWriteups = ({ selectedMedia }) => {
  //console.log(selectedMedia);

  const WRITEUPOBJ = {
    Top5BowlingList: {
      COPY: `# Top 5 Bowlers:
## Bowler Name 1
### Team Name 1
Bowler Name 1 delivered an exceptional performance against Opposing Team 1. In just 6 overs, they managed to take 5 wickets, conceding a mere 11 runs. This remarkable display of accuracy and skill showcased their ability to consistently trouble the opposition batsmen.  Bowler Name 1 's tight line and length combined with their ability to generate movement proved to be a lethal combination.
      
## Bowler Name 2
### Team Name 2

Bowler Name 2 displayed a stellar bowling performance against Opposing Team 2. In 6 overs, they claimed 3 wickets while conceding only 24 runs. Bowler Name 2's ability to extract bounce and vary their pace kept the batsmen guessing throughout their spell. Their disciplined approach and clever changes in line and length made them a constant threat to the opposition.

## Bowler Name 3
### Team Name 3
Bowler Name 3 showcased their bowling prowess against Opposing Team 3. In just 4 overs, they picked up 2 wickets, conceding a mere 14 runs. Bowler Name 3's ability to generate movement off the pitch and their accuracy in hitting the right areas troubled the batsmen and restricted the scoring opportunities. Their contribution played a vital role in their team's success.
## Bowler Name 4
### Team Name 4
Bowler Name 4 delivered an impressive performance against Opposing Team 4. In 4 overs, they claimed 2 wickets, conceding only 28 runs. Bowler Name 4's ability to mix up their deliveries and deceive the batsmen with their variations proved to be fruitful. Their tight control over line and length ensured that the opposition struggled to score freely against them.
## Bowler Name 5
### Team Name 5
Bowler Name 5, playing for Team Name 5, displayed their bowling prowess against Opposing Team 5. In 4 overs, they managed to claim 1 wicket while conceding just 13 runs. Bowler Name 5's ability to consistently hit the right areas and maintain a disciplined line made it difficult for the opposition batsmen to score runs freely. Their economical spell played a crucial role in their team's success.
These top 5 bowlers showcased their skills and made significant contributions to their respective teams. Their ability to consistently take wickets and restrict the opposition's scoring opportunities played a vital role in their team's success. These performances serve as a testament to their talent and highlight their importance in the game of cricket.`,
    },
    LadderOverview: {
      COPY: `# Cricket Ladder Overview:
## Premier Division One Day & Two Day
### Tight Competition at the Top
In the Premier Division One Day & Two Day league, Coastal Kings P1 One Day/Two Day is leading the pack with 22.5 points from 6 matches played. With 4 wins and just 1 loss, they have shown their dominance on the field. However, Highland P1 One Day/Two Day Team is hot on their heels, securing the second position with 17.5 points from 5 matches. With 3 wins and 1 loss, Highland is proving to be a formidable opponent.

## Premier Division Three One Day
### Battle for the Top Spot
The Premier Division Three One Day league features a tight race for the top position. Valley Vikings P3 OneDay is currently leading the ladder with 18.0 points from 6 matches. With 4 wins and 1 loss, they have showcased their skills on the field. However, teams like Summit Strikers Premier 3, Oakwood Premier 3, and Riverside Royals Premier 3 are not far behind, all tied with 16.0 points from 6 matches. This intense competition promises an exciting finish to the season.

## Premier Division Four
### Highland P4 Team Dominating
In the Premier Division Four league, Highland P4 Team is setting the pace with 18.0 points from 6 matches. With 4 wins and 1 loss, they have established themselves as the team to beat. Mountain Miners P4 follows closely in second place with 14.0 points from 5 matches, showcasing their consistency on the field. The competition remains fierce as teams like Riverside Royals P4 and City Collegians 3rd XI are in the hunt for higher positions.
`,
    },
    Top5BattingList: {
      COPY: `# Top 5 Run Scorers:
## Player Name 1
### Team: Team 1
67 runs off 64 balls, with a strike rate of 104.68.
Player Name 1 showcased their batting prowess in the match against Opponent Team 1. Their innings of 67 runs off 64 balls, with a strike rate of 104.68, played a vital role in their team's success. Player Name 1's ability to rotate the strike and find the boundaries consistently was evident throughout their innings. They displayed a balanced approach, accumulating runs steadily while maintaining a respectable strike rate.

## Player Name 2
### Team: Team 2
65 runs off 51 balls, with a strike rate of 127.45.
Player Name 2's explosive batting performance for Team 2 against Opponent Team 2 deserves recognition. Scoring 65 runs off just 51 balls at a strike rate of 127.45, Player Name 2 played a crucial role in propelling their team to a formidable total. Their aggressive stroke play and ability to find the gaps consistently put the opposition under immense pressure. Player Name 2's innings was a testament to their power-hitting capabilities.

## Player Name 3
### Team: Team 3
62 runs off 70 balls, with a strike rate of 88.57.
Player Name 3's patient yet impactful innings of 62 runs off 70 balls for Team 3 against Opponent Team 3 demonstrated their ability to anchor an innings. Despite facing a significant number of deliveries, Player Name 3 maintained a strike rate of 88.57, showcasing their ability to rotate the strike and keep the scoreboard ticking. Their calculated approach and ability to build partnerships were crucial in their team's batting performance.

## Player Name 4
### Team: Team 4
61 runs off 44 balls, with a strike rate of 138.63.
Player Name 4's blistering knock of 61 runs off just 44 balls for Team 4 against Opponent Team 4 was a masterclass in aggressive batting. With a strike rate of 138.63, Player Name 4's innings was filled with powerful strokes and well-timed boundaries. Their ability to dominate the bowlers from the outset set the tone for their team's innings and put them in a commanding position.

## Player Name 5
### Team: Team 5
60 runs off 36 balls, with a strike rate of 166.66.
Player Name 5's explosive batting display for Team 5 against Opponent Team 5 was a sight to behold. Scoring 60 runs off just 36 balls at a staggering strike rate of 166.66, Player Name 5's innings was filled with aggressive stroke play and powerful hitting. Their ability to find the boundaries consistently and accelerate the scoring rate quickly proved to be a game-changer for their team.

These top 5 run scorers showcased their exceptional batting skills and played crucial roles in their respective teams' performances. Their ability to adapt to match situations, maintain a high strike rate, and deliver impactful innings make them valuable assets in the game of cricket.`,
    },
    "Up Coming Fixtures (abstract)": {
      COPY: `# Easts U15  vs RJCC U14 
Coastal U15 vs Mountain U14
Get ready for an enthralling battle as the Coastal U15 Waves take on the Mountain U14 Challengers in a highly anticipated T20 cricket match. This clash of strategy and skill is scheduled for Friday, December 1, 2023, at the picturesque Seaside Park's Oval 2. Prepare yourself for an intense display of talent and competition.
      
The Coastal U15 Waves, currently sitting at the 2nd spot in the ladder, have accumulated 6.0 points from 2 matches played. With 1 win and 1 loss, they have shown resilience and the ability to bounce back. Ranked 4th with the same number of points, the Mountain U14 Challengers have also proven their mettle with 1 victory and 1 defeat in their 2 matches.
      
Adding to the intrigue is the historical data. In a previous encounter, the Coastal U15 Waves faced off against the formidable Coastal U15 Thunder, with the Thunder emerging victorious by 10 wickets. However, the Waves' captain,  Player Name , displayed exceptional batting skills, scoring 53 runs off just 24 balls.  Player Name 2  and  Player Name 3  also made significant contributions with 25 and 20 runs respectively.  Player Name 4 ,  Player Name 5 , and  Player Name 6  showed their bowling prowess by taking a wicket each.
      
As the stage is set for the Coastal U15 Waves and the Mountain U14 Challengers to face off, anticipation reaches its peak. With a mix of experienced players and emerging talents, it's hard to predict the outcome. The clash of strategies, the battle for supremacy, and the pursuit of victory will unfold on the hallowed grounds of Seaside Park's Oval 2.
      
So mark your calendars, cricket enthusiasts, as the Coastal U15 Waves and the Mountain U14 Challengers gear up to deliver a captivating display of cricketing prowess. Prepare yourself for astonishing shots, wicket-taking deliveries, and tactical maneuvers that will keep you on the edge of your seat. Witness a clash of titans that will leave a lasting impact on the Friday PM U15 Spring competition.`,
    },
    "Weekend Results": {
      COPY: `# **Lakeside 2nd Grade Clinch Thrilling Victory Against Hilltop Burrawang 2nd Grade**
In an intense cricket showdown, Lakeside 2nd Grade claimed a thrilling victory over Hilltop Burrawang 2nd Grade.

### Lakeside's Batting Excellence
Jordan Patterson, opening for Lakeside, played a magnificent innings, scoring a swift 78 runs off 60 balls, including 12 boundaries. His aggressive approach and sharp shot selection kept the score ticking and laid a solid foundation. Following suit, Alex Miller contributed a vital 45 runs off 35 deliveries, balancing aggression with smart play. Together, they propelled Lakeside to a formidable total of 172 runs for 4 wickets.

### Hilltop Burrawang's Steady Chase
In response, Hilltop Burrawang put up a competitive chase, with their top-order batsman, Michael James, scoring a resilient 52 runs off 48 balls. Despite a couple of quick wickets, they managed to keep the chase alive, reaching 150 runs by the 18th over.

### Lakeside's Bowling Dominance
Lakeside's bowling attack was spearheaded by Ryan Thompson and Mia Knight. Thompson delivered a tight spell, claiming 3 wickets for 24 runs in his 4 overs, including the crucial wicket of Michael James. Mia Knight complemented this with her spin bowling, taking 2 wickets for 30 runs and applying pressure in the middle overs.

### The Final Overs
The match reached a crescendo in the final overs, with Hilltop Burrawang needing 23 runs off the last 12 balls. However, Lakeside's bowlers held their nerve, executing their skills under pressure. The game concluded with Hilltop Burrawang scoring 165 runs for 7 wickets, falling short by just 7 runs.

Lakeside's victory was a testament to their all-round performance. Jordan Patterson's explosive batting, Alex Miller's composed innings, and the clinical bowling by Ryan Thompson and Mia Knight were instrumental in sealing the win. This victory not only demonstrates Lakeside 2nd Grade's skill and tenacity but also cements their standing as a dominant force in the league. As the season progresses, Lakeside looks poised to continue their winning ways, while Hilltop Burrawang will seek to bounce back in their upcoming matches.
`,
    },
  };

  if (!selectedMedia) return false;
  if (WRITEUPOBJ[selectedMedia?.CompositionID] === undefined) return false;
  return (
    <>
      <Paper p={10} withBorder shadow="md" mb={20} w={"100%"}>
        <ScrollArea h={700}>
          <ReactMarkdown className="markdown">
            {WRITEUPOBJ[selectedMedia.CompositionID].COPY}
          </ReactMarkdown>
        </ScrollArea>
      </Paper>
    </>
  );
};
