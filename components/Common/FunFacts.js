import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, useMantineTheme } from "@mantine/core";
import { useState } from "react";

const FunFacts = () => {
  return (
    <>
  <div className="pt-100 pb-70 bg-eaf6ff">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-6">
          <div
            className="funfact-card"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <i className="pe-7s-news-paper"></i> 
            <h3>Writeups</h3>
            <Writeup />
            <p>
              Fixtura's AI write ups provide high-quality, customizable
              content for clubs and associations to use in their communication
              and marketing efforts. Our advanced AI technology generates unique
              and engaging articles that can be tailored to your specific needs
              and goals.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div
            className="funfact-card"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <i className="pe-7s-video"></i>
            <h3>Videos</h3>
            <VideoModel />
            <p>
              Fixtura videos are a great way to keep your members and followers
              informed about upcoming matches and competitions, with dynamic
              layouts and all the important details clearly displayed.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div
            className="funfact-card"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <i className="pe-7s-photo"></i>
            <h3>Images</h3>
            <ImageModel />
            <p>
              Fixtura's images are high-quality and tailored to showcase your
              club or association in a professional and visually appealing way.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default FunFacts;

function Writeup() {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Moss Vale 3rd Grade vs Robertson Burrawang 3rd Grade"
        size="lg"
      >
        <p>
          Moss Vale 3rd Grade cricket team proved their worth again in the
          Semi-Finals against Robertson Burrawang 3rd Grade held Saturday, 11
          March 2023, at Stephens Park. In an intense match between two of the
          district's finest sides, Moss Vale 3rd Grade emerged victorious,
          securing their place in the next round of the competition.
        </p>
        <p>
          The first innings saw Robertson Burrawang 3rd Grade bat first and
          finish with a total of 9/126 runs in 40 overs. The Moss Vale 3rd Grade
          bowlers showed great skill on the pitch with their top bowlers,
          including Mackenzie Perry, Martin Butcher and Jack Gett, who delivered
          outstanding performances, taking a combined six wickets.
        </p>
        <p>
          During the second innings, Moss Vale 3rd Grade batting showcased their
          prowess, ultimately scoring 4/130 runs in 29.2 overs. While
          impressive, it was Todd Holland's impressive bowling for Robertson
          Burrawang 3rd Grade that nearly derailed Moss Vale's progress.
          However, despite the late surge by an inspired Holland, the Moss Vale
          batsmen had done enough to secure the victory.
        </p>
        <p>
          Moss Vale 3rd Grade showed character and resilience in what was an
          exhilarating match to advance further in the competition. This match
          is proof that despite the odds, Moss Vale 3rd Grade cricket team can
          come back from behind and come out on top. Let us cheer them on as
          they move forward to the next round! Congratulations again to Moss
          Vale 3rd Grade.
        </p>
      </Modal>
      <p>Examples</p> 
      <Group position="center" mb={20}>
        
        <Button onClick={open} className="btn btn-secondary-a">Game Review</Button>
      </Group>
    </>
  );
}

function VideoModel() {
  const [opened, { open, close }] = useDisclosure(false);
  const [video, setVideo] = useState(false)



  return (
    <>
      <Modal
        padding={0}
        opened={opened}
        onClose={close}
        size="lg"
        centered
        withCloseButton={false}
      >
        <div
          className="video-background"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <video
            autoPlay
            loop
            controls
            height="auto"
            width={`100%`}
            src={video}
          />
        </div>
      </Modal>
      <p>Examples</p>
      <Group position="center" mb={20}>
      
        <Button className="btn btn-secondary-a" onClick={()=>{open(); setVideo("/video/Moss_Vale_Cricket_Club_Weekend_Results_e7d1ff0d5585.mp4")}}>results</Button>
        <Button className="btn btn-secondary-a" onClick={()=>{open(); setVideo("/video/Runaway_Bay_Cricket_Club_Inc_Top_5_fa16ec8aa992.mp4")}}>Top 5</Button>
        <Button className="btn btn-secondary-a" onClick={()=>{open(); setVideo("/video/Logan_District_Cricket_Association_Fixtures_83ce0597cee2.mp4")}}>Fixtures</Button>
        
      </Group>
    </>
  );
}


function ImageModel() {
  const [opened, { open, close }] = useDisclosure(false);
  const [video, setVideo] = useState(false)



  return (
    <>
      <Modal
        padding={0}
        opened={opened}
        onClose={close}
        size="lg"
        centered
        withCloseButton={false}
      >
        <div
          className="video-background"
          style={{ position: "relative", overflow: "hidden" }}
        >
         <img src={video} />
        </div>
      </Modal>
      <p>Examples</p>
      <Group position="center" mb={20}>
      
        <Button className="btn btn-secondary-a" onClick={()=>{open(); setVideo("/video/Image_Results.png")}}>results</Button>
        <Button className="btn btn-secondary-a" onClick={()=>{open(); setVideo("/video/Image_Top5.png")}}>Top 5</Button>
        <Button className="btn btn-secondary-a" onClick={()=>{open(); setVideo("/video/Image_Ladder.png")}}>Ladder</Button>
        
      </Group>
    </>
  );
}