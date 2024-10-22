"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import {v4 as uuidv4} from "uuid";

const scriptData="In the heart of the Roman Empire, bustling marketplaces buzzed with activity. Merchants hawked their wares, skilled artisans displayed their crafts, and citizens bartered for goods. The scent of spices and fresh bread filled the air, while the sounds of chatter, laughter, and the clanging of metal mingled in the vibrant atmosphere. For centuries, the Great Wall of China stood as a testament to human ingenuity and perseverance. Stretching for thousands of miles, it served as a powerful symbol of protection against invaders, a testament to the ingenuity of ancient Chinese civilization. The colossal pyramids of Egypt, erected as tombs for powerful pharaohs, stand as enduring monuments to ancient Egypt's architectural prowess. Built by thousands of skilled workers, these majestic structures have captivated the imagination for millennia, offering a glimpse into the grandeur of a bygone era. The Vikings, fearless seafarers from Scandinavia, embarked on daring voyages across the vast oceans. Their longships, sleek and swift, carried them to distant shores, where they traded, explored, and established settlements, leaving an indelible mark on history. Leonardo da Vinci's Mona Lisa, a masterpiece of Renaissance art, remains one of the most iconic and enigmatic portraits in history. Her enigmatic smile and captivating gaze have captivated art enthusiasts for centuries, fueling endless interpretations and debates. "
const FILEURL="https://firebasestorage.googleapis.com/v0/b/short-video-generator-c88f1.appspot.com/o/short-video-files%2Fc34a92a3-2faa-4c81-9668-7985d1c7665a.mp3?alt=media&token=c4cdffbe-4541-41fc-a6f2-bf4d3224a943"
function CreateNew() {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const onHandleInputChange= (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue)

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }


  const onCreateClickHandler = () => {
    // GetVideoScript();
    // GenerateAudioFile(scriptData);
    GenerateAudioCaption(FILEURL);
  }
  const GetVideoScript = async () => {
    setLoading(true)
    const prompt="Write a script to generate "+formData.durtion+" video on topic: "+formData.topic+" along with AI image prompt in "+formData.imageStyle+" format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text"
    console.log(prompt)
     const result = await axios.post("/api/get-video-script",{
      prompt:prompt
     }).then(resp => {
      setVideoScript(resp.data.result);
      GenerateAudioFile(resp.data.result);
     });
     setLoading(false);
  }


  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
  // Verificar si videoScriptData es un arreglo
  // if (Array.isArray(videoScriptData)) {
  //   videoScriptData.forEach(item => {
  //     script = script + item.ContentText + " ";
  //   });

     await axios.post("/api/generate-audio", {
       text:videoScriptData,
       id:id
     }).then(res => {
       console.log(res.data);
       setAudioFileUrl(res.data.result)
     })

     setLoading(false)
  //  } else {
  //  console.error("videoScriptData no es un arreglo:", videoScriptData);
  //  }

    console.log(script)
  }


  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);

    await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl
    }).then(res => {
      console.log(res.data.result);
      setCaptions(res?.data?.result)
    })
    setLoading(false);
  }

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>
        <div className='mt-10 shadow-md p-10'>
          <SelectTopic onUserSelect={onHandleInputChange}/>

          {/** Select style*/}
          <SelectStyle onUserSelect={onHandleInputChange}/>
          {/** Duration*/}
          <SelectDuration onUserSelect={onHandleInputChange}/>
          {/** Create button*/}

          <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
        </div>

        <CustomLoading loading={loading}/>
      </h2>
    </div>
  )
}

export default CreateNew