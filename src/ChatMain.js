import "./styles.css";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
//import useWebSocket, { ReadyState } from "react-use-websocket";
import axios from "axios";

function ChatMessage({ author, mseg }) {
  console.log(mseg.userid);
  return (
    <div className="chatMsg">
      <div className="chatMsgProfile">
        <a href={author.purl}>
          <img className="chatMsgImg" src={author.imag} alt={author.name} />
        </a>
        <div className="chatMsgDate">{author.name}</div>
      </div>
      <div className="chatMsgContent">
        <div className="chatMsgText">{mseg.message}</div>
      </div>
    </div>
  );
}

export default function ChatMain() {
  const [msgs, setMsgs] = useState([]);
  const [update, setUpdate] = useState(false);

  const stream_id = 123;
  const access_token =
    "5ff8764eaed43c545a0fb0fe1220bab4d95c76a961d814896eb44412295ad9c3064b61f6e32854ae77f402f591cc44f3d3d80484f4b984caba86b00af98c8505";

  useEffect(() => {
    axios
      .get(
        `https://youinroll.com/listen/stream?api=1.0&stream_id=${stream_id}&access_token=${access_token}`
      )
      .then((response) => {
        console.log(response.data.response);
        setMsgs(response.data.response);
        let objDiv = document.getElementById("chatmain");
        objDiv.scrollTop = objDiv.scrollHeight;
      })
      .catch((error) => {
        console.log(error);
      });
    const timer = setTimeout(() => {
      setUpdate(!update);
    }, 10000);
    return () => clearTimeout(timer);
  }, [update]);

  const author = {
    name: "Никита Вадимович",
    purl: "https://youinroll.com/profile/nikita-vadimovich/1/",
    imag:
      "https://youinroll.com/res.php?src=storage/uploads/916a102143c0f3271b02aec7eb21bb50-1.jpg&amp;q=100&amp;w=40&amp;h=40"
  };
  //   const mseg = { text: "😎😚😙😊😉😂?" };

  return (
    <>
      {msgs.map((msg, index) => (
        <ChatMessage key={index} mseg={msg} author={author} />
      ))}
      <div id="bottomelement" />
    </>
  );
}
