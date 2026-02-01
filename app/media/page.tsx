"use client";
import React, { useEffect, useState } from 'react';
import { getPhotosVideos } from '../../services/photosVideosService';

const MediaPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPhotosVideos().then((data) => {
            setItems(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Photos & Videos</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item: any) => (
                        <div key={item._id} className="bg-white rounded-lg shadow p-4">
                            <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                            {item.type === 'photo' ? (
                                <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
                            ) : (
                                <video src={item.url} controls className="w-full h-48 rounded mb-2" />
                            )}
                            <p className="text-gray-600 text-sm mb-1">{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MediaPage;
