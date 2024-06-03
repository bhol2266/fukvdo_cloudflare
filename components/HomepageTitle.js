
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";


import {
    ChevronRightIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

const HomepageTitle = ({ title, country, language }) => {

    const [href, sethref] = useState('');

    useEffect(() => {

        if (title.includes('Popular Porn Videos in')) {
            sethref(`/search/${language}`)
        } else if (title.includes('Desi Sex Videos')) {
            sethref(`/search/Desi Sex Videos`)

        } else if (title.includes('Desi MMS')) {
            sethref(`/search/Desi MMS`)

        } else {
            sethref(`/${title.substring(0, title.indexOf('Porn')).trim().toLowerCase()}`)

        }
    }, []);


    return (
        <div>


            {title &&
                <Link href={href}>
                    <div className="flex justify-between items-center  rounded bg-theme text-white  p-2 px-3  hover:bg-button_hover ">
                        <div className="flex space-x-2 items-center ">

                            <h2 className="lg:text-2xl text-lg  font-arial " >{title}</h2>

                            {title.includes('Popular Porn Videos in') &&
                                <ReactCountryFlag
                                    svg
                                    countryCode={title.substring(title.indexOf('in') + 2, title.length).trim()}
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '25px',
                                    }}
                                    aria-label="United States"
                                />
                            }
                        </div>
                        <ChevronRightIcon className="icon" />
                    </div>
                </Link>
            }
        </div>

    )
};
export default HomepageTitle;