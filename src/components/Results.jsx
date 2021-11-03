import React,{useEffect} from 'react'
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';

import {Loading} from './Loading'

export const Results = () => {
    const {getResults,results,searchTerm,setSearchTerm,isLoading} = useResultContext()
    const location = useLocation();

    useEffect(()=>{
        if(searchTerm) {
            if(location.pathname === '/videos') {
                getResults(`/search/q=${searchTerm} videos`);
            } else {
                getResults(`${location.pathname}/q=${searchTerm}&num=40`)
            }
        }
    },[searchTerm,location.pathname]);

    if(isLoading) return <Loading/>

    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y-6 lg:px-56 md:px-28 sm:px-5">
                    {
                        results?.results?.map(({link,title,description},index)=>(
                            <div key={index} className="w-full">
                                <a href={link} target="_blank" rel="noreferrer">
                                    <p className="text-sm">
                                        {link.length > 30 ? link.substring(0,30) + "...": link}
                                    </p>
                                    <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                        {title}
                                    </p>
                                </a>
                                <p className="text-md dark:text-gray-200 text-gray-700">
                                    {description.length > 200 ? description.substring(0,200) + "...": description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            );
        case '/images':
            return 'SEARCH';
        case '/news':
            return 'SEARCH';
        case '/videos':
            return 'VIDEOS';
        default:
            return 'ERROR!';
    }
}
