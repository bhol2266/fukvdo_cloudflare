import React, { useEffect } from 'react'

 const Ruogh = () => {

 
    useEffect(() => {

        const fetchVideoDetails = async () => {

            let api = `http://localhost:3000/api/videoPlayer`
            // let api=`http://localhost:3000/api/spangbang/videoPlayer`
            // let api=`https://clownfish-app-jn7w9.ondigitalocean.app/getVideoPageDetails`

            const rawResponse = await fetch(api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ href: `https://spankbang.party/99n6m/video/family+therapy+stepdaughter+skylar+vox` })

            });

            const data = await rawResponse.json();
            console.log(data);
        
        }
      
        fetchVideoDetails()


    }, []);



  return (
    <div>
        


    </div>
  )
}

export default Ruogh;

