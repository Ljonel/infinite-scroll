import React, { useState, useEffect } from "react";
import "./App.css";
import { IoRocket } from "react-icons/io5";

function App() {
  const [page, setPage] = useState(0);
  const [launches, setLaunches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const positionOfScrollTop = e.currentTarget; //position of scroll
    const clientHeight = e.currentTarget; //size of client screen
    const scrollHeight = e.currentTarget; //height of scroll -> depends of amount of data in div

    // console.log(
    //   scrollHeight.scrollHeight - positionOfScrollTop.scrollTop, // we know that we are in the bottom of the div -> load more data
    //   clientHeight.clientHeight
    // );
    // console.log(`Scroll height: ${scrollHeight.scrollHeight}`);
    // console.log(`Scroll Top: ${positionOfScrollTop.scrollTop}`);
    // console.log(`Client Height: ${clientHeight.clientHeight}`);

    if (
      scrollHeight.scrollHeight - positionOfScrollTop.scrollTop <= clientHeight.clientHeight &&
      !loading
    ) {
      setPage(page + 1);
    } else {
    }
  };
  useEffect(() => {
    getLaunches(page);
  }, [page]);

  const getLaunches = async (page: number) => {
    setLoading(true);
    const response = await fetch(`https://api.spacex.land/graphql/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
        launchesPast(limit: 10, offset: ${page * 10}){
          mission_name
          id
          launch_year
        }
      }`,
      }),
    });
    const data = await response.json();
    setLaunches([...launches, ...data.data.launchesPast]);
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="app-overlay"></div>
      <div className="launches-container">
        <h1>Launches</h1>
        <div className="launches" onScroll={handleScroll}>
          {launches &&
            launches.map((launch) => (
              <div key={launch.id} className="launches-element">
                <IoRocket className="rocket-icon" />
                <div className="launches-content">
                  <h1> {launch.id}</h1>
                  <p> Launch year: {launch.launch_year}</p>
                </div>
              </div>
            ))}
          {<p style={loading === true ? { display: "block" } : { display: "none" }}>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
export default App;
