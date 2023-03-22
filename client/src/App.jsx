// Import all the components here
import { createRoot } from "react-dom/client";
import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const authToken = cookies.Authtoken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  };
  // This useEffect is fetching the data 2 times but if we don't give the square brackets then it will fetch infinite
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  console.log(tasks);

  // Sorted task by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // This returns main div
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🏠 Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome Back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">Creative Coding</p>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
