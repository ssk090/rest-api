import { useState, useEffect } from "react";
import pauseMobile from "./images/pattern-divider-mobile.svg";
import pauseDesktop from "./images/pattern-divider-desktop.svg";
import dice from "./images/shuffle.png";
import loadingIcon from "./images/loading-icon.svg";

function App() {
  const [text, setText] = useState([]);
  const [id, setId] = useState(0);
  const [excuse, setExcuse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=DO0ETVXkh2-CEEgoK9OdGtWx1BFVQ3mb99hiVLO1al8Jj79eYxNhx4c1Rv89KiE4s5bVp0xDtx7UQ1TCsO741XdJPYJmzmazm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAqMVQLaprySY_mB5WodfhtE_APNrmwS0Nocz9PQ09zLHHDd4q0GU90vPb3WKJdCQ5ZeVKwUxyYhw5D5tZGpJMwCH1sXD1iX89z9Jw9Md8uu&lib=Mebct85KSg-iSMYieBdmR6Hb1gGG9u9sa"
    );
    const data = await res.json();
    setText(data);
    const random_excuse =
      data.data[Math.floor(Math.random() * data.data.length)];
    console.log(random_excuse);
    setId(random_excuse.id);
    setExcuse(random_excuse.item);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Excuse #{id}</h1>
        {!isLoading && <p>{excuse}</p>}
        <div>{isLoading && <img src={loadingIcon} />}</div>

        <picture>
          <source media="(min-width: 768px)" srcset={pauseDesktop} />
          <img src={pauseMobile} alt="pause-mobile" />
        </picture>

        <div>
          <button onClick={fetchData}>
            <img src={dice} alt="dice" height={20} width={20} />
          </button>
        </div>
      </div>
      <div class="attribution">
        Coded by
        <a href="https://github.com/ssk090" target="_blank">
          Shivananda Sai
        </a>
        {/* <p>
          You want to add your excuse to the list ? <a href="#">Click Here</a>
        </p> */}
      </div>
    </>
  );
}

export default App;
