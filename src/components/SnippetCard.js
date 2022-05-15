import { useState } from "react";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
import "./card.css";

const SnippetCard = (props) => {
  const { setItem, fullscreen = false, snippet, title, handleCopy } = props;
  return (
    <div
      style={{
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#fff",
        margin: fullscreen ? 20 : 0,
        marginBottom: 12,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        width: fullscreen ? "100%" : "70%",
      }}
    >
      <div className="title">{title}</div>
      <div className="snippet">
        <pre>{snippet}</pre>
      </div>
      <div className="bottom">
        <div
          onClick={() => {
            handleCopy(snippet);
          }}
          title={"click to copy"}
          style={{ marginRight: 10 }}
        >
          <img
            className="copyIcon"
            src={require("../assets/copy.png")}
            alt={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          />
        </div>
        <div
          onClick={() => {
            setItem(fullscreen ? [] : { snippet, title });
          }}
        >
          <img
            className="icon"
            src={
              fullscreen
                ? require("../assets/full-screen-exit.png")
                : require("../assets/fullscreen.png")
            }
            alt={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          />
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
