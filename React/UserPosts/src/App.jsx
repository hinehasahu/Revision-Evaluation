import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [users, setUsers] = useState([]);
  let [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState([]);
  let [userid, setUserId] = useState("")

  const showData = (e) => {
    // let postdata = posts.filter((p) => Number(p.userId) === Number(id));
    // setData(postdata);
    console.log(setUserId(e.target.value))
  };
  // console.log("DATA: ",data);


  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err.message));

    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err.message));
    setLoading(false);
  }, []);

  // console.log(users, posts);
  if (loading) <h4>Loading...</h4>;

  return (
    <>
      <select value={userid} onChange={showData}>
        {users &&
          users.map((user) => (
            <option value={user.name} key={user.id}>
              {user.name}
            </option>
          ))}
      </select>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          backgroundColor: "coral",
        }}>
        {data &&
          data.map((p) => (
            <div key={p.id}>
              <h5>{p.title}</h5>
              <h3>{p.body}</h3>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
