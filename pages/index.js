import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import React from 'react';
import MultiformatAds from '../components/Ads/MultiFormatAds';
import Outstreams from '../components/Ads/Outstream';
import PopunderAds from '../components/Ads/PopunderAds';
import HomepageTitle from '../components/HomepageTitle';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import Category_slider from '../components/category_slider';
import { getLanguge } from '../config/getLanguge';
import { scrapeVideos } from '../config/spangbang';
import videosContext from '../context/videos/videosContext';
import { shuffleData, updateCountry } from '../config/firebase/lib';


export default function Home({ video_collection, pages, desiVideosDataArray, desiMmsVideoArray }) {


  const { currentLocation, setcurrentLocation } = useContext(videosContext);
  const [countryVideos, setcountryVideos] = useState([]);
  const [countryName, setcountryName] = useState("");
  const [countryLanguage, setcountryLanguage] = useState('');

  const router = useRouter()


  async function fetchVideos(data) {

    console.log("--------------------x---------------------------x--------------------------x---------------------------");

    const lang = getLanguge(data.countryName)
    setcountryLanguage(lang)

    //value is languge of country

    let url = `https://spankbang.party/s/${lang.toLowerCase().trim()}/`

    const rawResponse = await fetch('https://fuckvideo.live/api/spangbang/getvideos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });
    const content = await rawResponse.json();

    setcountryVideos(content.finalDataArray)
  }

  async function fetchLocation() {


    const location_localstorage = localStorage.getItem("location")
    if (location_localstorage !== null) {
      const parsedLocation = JSON.parse(location_localstorage)
      setcurrentLocation(parsedLocation)
      countryUpdated_DB(parsedLocation.countryName)
      await fetchVideos(parsedLocation)

    } else {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self')
        const data = await response.json();

        setcurrentLocation(data)
        await fetchVideos(data)
        await countryUpdated_DB(data.countryName)
        localStorage.setItem("location", JSON.stringify(data))
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function countryUpdated_DB(country) {
    //Check the country updated in DB or not
    const countryUpdated_DB = getCookie('countryUpdated_DB')
    const email = getCookie('email')
    const accountType = getCookie('account')
    if (typeof countryUpdated_DB !== 'undefined' && typeof email !== 'undefined' && accountType !== 'credential') {
      if (countryUpdated_DB) {
        // return 

      }
      await updateCountry(email.trim(), country)
    }
  }

  useEffect(() => {

    let videoRoute = getCookie("videoRoute");
    if (typeof videoRoute !== 'undefined') {
      deleteCookie('videoRoute')
      router.push(videoRoute)
    }

    fetchLocation()

  }, []);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <div className=" ">


      <Head>
        <title>FuckVideo: Free Porn Videos and 4K Sex Movies</title>
        <meta name="description" content="FuckVideo is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on FuckVideo!" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />

      </Head>


      <Category_slider />

      <PopunderAds />

      <main className="flex-row flex  mt-1 md:mt-3 md:space-x-3 space-x-2">
        <Sidebar />
        <div>
          {/* <h1 className="lg:mb-3 mb-2 lg:text-lg text-center lg:text-left text-[15px] md:text-lg border-t-[0.5px] md:border-0 border-slate-300  shadow-xl px-1 pb-2 pt-2 md:pt-0 lg:py-0 font-inter">
            Free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. full hd indian sex videos download free.
          </h1> */}




          {countryVideos.length !== 0 && countryName === "India" &&
            <>
              <HomepageTitle title='Desi Sex Videos' />
              <Videos data={shuffle(desiVideosDataArray).slice(0, 12)} />
              <HomepageTitle title='Desi MMS' />
              <Videos data={shuffle(desiMmsVideoArray).slice(0, 12)} />
            </>
          }


          <HomepageTitle title='Popular Porn Videos' />
          <Videos data={video_collection[2].slice(0, 15)} />

          {countryVideos.length !== 0 &&
            <>
              <HomepageTitle title={`Popular Porn Videos in ${currentLocation.countryCode}`} country={currentLocation.countryName} language={countryLanguage} />
              <Videos data={shuffle(countryVideos).slice(0, 12)} />
            </>
          }


          <HomepageTitle title='Trending Porn Videos' />
          <Videos data={video_collection[0].slice(0, 15)} />
          <HomepageTitle title='Upcoming Porn Videos' />
          <Videos data={video_collection[1]} />
          <HomepageTitle title='New Porn Videos' />
          <Videos data={video_collection[3]} />

        </div>
      </main>

      <footer >
        <MultiformatAds />
        <Outstreams />
        <a className='' href="https://www.fuckvideo.live/">.</a>
        <a className='' href="https://www.chutlunds.com/">.</a>
        <a className='' href="https://www.desikahaniya.in/">.</a>
      </footer>
    </div>
  )
}


export async function getStaticProps({ req, res }) {

    

  const parcelData = { href: "https://spankbang.party/" }

  const API_URL = `${process.env.BACKEND_URL}getHomePageVideos`;

  const rawResponse = await fetch(API_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(parcelData),
  });
  const ress = await rawResponse.json();;
  const finalDataArray_Arrar = await ress.finalDataArray;


  var desiVideosDataArray = []
  const obj = await scrapeVideos(`https://spankbang.party/s/desi%20sex%20videos/?o=all`)
  desiVideosDataArray = obj.finalDataArray

  var desiMmsVideoArray = []
  const obj2 = await scrapeVideos(`https://spankbang.party/s/desi%20mms/?o=all`)
  desiMmsVideoArray = obj2.finalDataArray



  return {
    props: {
      video_collection: finalDataArray_Arrar,
      desiVideosDataArray: desiVideosDataArray,
      desiMmsVideoArray: desiMmsVideoArray
    }
  }


}
