/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [query, setQuery] = useState("dog");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);

  const getPhotos = async (type) => {
    let url = `https://api.pexels.com/v1/search?query=${query}`;
    if (data?.next_page && type === "next") {
      url = data.next_page;
    }

    if (data.prev_page && type === "back") {
      url = data.prev_page;
    }

    setLoading(true);
    await fetch(url, {
      headers: {
        Authorization: process.env.REACT_APP_YOUR_API_KEY,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res);

        setPhotos(res.photos);

        // concat 15 +15 wo sab bhi deeekhen
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      getPhotos();
    }
  };

  return (
    <div>
      <input
        className="inputSearch"
        onKeyDown={onKeyDownHandler}
        placeholder="Search for free photos"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      <div>
        <button disabled={data?.page === 1} onClick={() => getPhotos("back")}>
          Prev
        </button>
        <button onClick={() => getPhotos("next")}>NEXT</button>
      </div>

      {loading && <h1>Fetching...</h1>}
      <div className="container">
        {photos?.map((item, index) => {
          return (
            <div className="box" key={index}>
              <img src={item.src.medium} alt={item.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
