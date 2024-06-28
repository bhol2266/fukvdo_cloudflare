import cheerio from 'cheerio';

import { NextResponse, NextRequest } from "next/server";
export const config = {
    runtime: 'edge',
}




export default async function handler(req, res) {

    var finalDataArray_Arrar = []
    var finalDataArray = []

    var thumbnailArray = []
    var TitleArray = []
    var durationArray = []
    var likedPercentArray = []
    var viewsArray = []
    var previewVideoArray = []
    var hrefArray = []

    const response = await fetch('https://spankbang.party/')
    const body = await response.text();
    const $ = cheerio.load(body)


    $('.videos .video-list.video-rotate').each((i, el) => {


        const select = cheerio.load(el)


        select('.video-item picture img').each((i, el) => {

            const data = $(el).attr("data-src")
            thumbnailArray.push(data)


        })



        select('.video-item picture img').each((i, el) => {

            const data = $(el).attr("alt")
            TitleArray.push(data)


        })

        select('.video-item .l').each((i, el) => {

            const data = $(el).text()
            durationArray.push(data)
        })



        select('.video-item .stats').each((i, el) => {

            const text = $(el).text()
            const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1)
            const views = text.substring(0, text.indexOf("%") - 4)

            likedPercentArray.push(likePercentage.trim())
            viewsArray.push(views.trim())

        })


        select('.video-item picture img').each((i, el) => {

            const data = $(el).attr("data-preview")
            previewVideoArray.push(data)
        })



        select('.video-item a').each((i, el) => {

            const href = $(el).attr('href');

            hrefArray.push(`https://spankbang.com${href}`)
    
    
        })



        for (let index = 0; index < thumbnailArray.length; index++) {

            if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cdate.com")) {

                finalDataArray.push({
                    thumbnailArray: thumbnailArray[index],
                    TitleArray: TitleArray[index],
                    durationArray: durationArray[index],
                    likedPercentArray: likedPercentArray[index],
                    viewsArray: viewsArray[index],
                    previewVideoArray: previewVideoArray[index],
                    hrefArray: hrefArray[index],

                })
            }
        }

        if (finalDataArray.length > 2) {
            finalDataArray_Arrar.push(finalDataArray)
        }

        thumbnailArray = []
        TitleArray = []
        durationArray = []
        likedPercentArray = []
        viewsArray = []
        previewVideoArray = []
        hrefArray = []

        finalDataArray = []
    })



    return NextResponse.json(finalDataArray_Arrar, {
        status: 200,
    });


}


