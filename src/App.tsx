import React, { useState, useEffect } from "react";
import "./App.css";
// import GetFromAPI from './getFromAPI';

const GRAPH_QUERY = `
  {
    launchesPast(limit: 10) {
      mission_name
      id
      rocket {
        rocket_name
        rocket_type
      }
    }
  `;

function App() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (e: any) => {
    const positionOfScrollTop = e.currentTarget; //position of scroll
    const clientHeight = e.currentTarget; //size of client screen
    const scrollHeight = e.currentTarget; //height of scroll -> depends of amount of data in div

    // console.log(
    //   scrollHeight.scrollHeight - positionOfScrollTop.scrollTop, // we know that we are in the bottom of the div -> load more data
    //   clientHeight.clientHeight
    // );

    if (scrollHeight.scrollHeight - positionOfScrollTop.scrollTop === clientHeight.clientHeight) {
      setPage(page + 1);
      console.log(page);
    } else {
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers((prev) => [...prev, ...newUsers]);

      getUsers(page);
      // `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=5`
      //`https://randomuser.me/api/?page=${page}&results=60`
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  const getUsers = async (page: number) => {
    const users: any = await (
      await fetch(`https://randomuser.me/api/?page=${page}&results=10`)
    ).json();

    return users.results;
  };

  return (
    <div className="App">
      <div className="users" onScroll={handleScroll}>
        {users &&
          users.map((user) => (
            <div style={{ marginBottom: "100px" }} key={user.cell}>
              {user.cell}
            </div>
          ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}
export default App;
