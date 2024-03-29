import { useRouter } from "next/router";
import Script from 'next/script';
import { useEffect, useState } from 'react';


function Outstreams() {


    const [videoPage, setvideoPage] = useState(false);
    const router = useRouter();

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();


    useEffect(() => {
        if (window.location.href.includes('video')) {
            setvideoPage(true)
        }

    }, []);

    return (

        <div className="fixed bottom-4 right-0 z-10 w-2/5  lg:w-1/5 ">
            <div id="ts_ad_video_lcc9e"></div>

            <Script src="//cdn.tsyndicate.com/sdk/v1/outstream.video.js"  strategy="beforeInteractive" />
            <Script
                id={uniqid}
                dangerouslySetInnerHTML={{
                    __html: ` TSOutstreamVideo({
                        spot: "cac149c5f3454aa48e0bd3aa3e3ae2ff",
                        containerId: "ts_ad_video_lcc9e",
                        cookieExpires: "4",
                         extid: "{extid}",
                    });`,
                }}
            />

        </div>
    )
}

export default Outstreams;
