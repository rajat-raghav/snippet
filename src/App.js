import { useEffect, useState } from "react";
import axios from "axios";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
import { baseURL } from "./helper/apifunctions";
import "./App.css";
import Search from "./components/Search";
import SnippetCard from "./components/SnippetCard";

function App() {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copy, setCopy] = useState(false);
  const [item, setItem] = useState({});
  const [filter, setFilter] = useState("");
  const getSnippet = async () => {
    axios
      .get("http://127.0.0.1:5000/snippet")
      .then((res) => {
        setRes(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getSnippet();
  }, []);

  const formatter = (snippet) => {
    const formattedCode = prettier.format(snippet, {
      parser: "babel",
      plugins: [babylon],
    });
    return formattedCode;
  };

  const handleFilter = async (filter) => {
    setLoading(true);
    await axios
      .post(baseURL + "/snippet", { filter: filter })
      .then((res) => {
        setRes(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  const handleCopy = (snippet) => {
    setCopy(true);
    navigator.clipboard.writeText(snippet);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader" />;
      </div>
    );
  }

  return (
    <>
      <Search
        handleFilter={handleFilter}
        setFilter={setFilter}
        filter={filter}
      />
      {res.length > 0 ? (
        <div className={item?.snippet ? "AppHidden" : "App"}>
          <div className={copy ? "copyNotificationOpen" : "copyNotification"}>
            <h3 className="copyNotificationText">Copied Successfully</h3>
          </div>
          {res.map((item) => {
            const { snippet, title, id } = item;
            return (
              <SnippetCard
                key={id}
                title={title}
                setItem={setItem}
                snippet={formatter(snippet)}
                handleCopy={handleCopy}
              />
            );
          })}
        </div>
      ) : (
        <div>No data found</div>
      )}
      {item?.snippet ? (
        <div
          style={{
            top: 0,
            backgroundColor: "#0000004D",
            width: "100%",
            height: "100vh",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            transition: "all 300ms ease 1s",
          }}
        >
          <SnippetCard
            snippet={item.snippet}
            setItem={setItem}
            fullscreen={true}
            title={item.title}
            handleCopy={handleCopy}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
