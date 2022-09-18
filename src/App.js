import { useState, useEffect } from "react";
import pauseMobile from "./images/pattern-divider-mobile.svg";
import pauseDesktop from "./images/pattern-divider-desktop.svg";
import dice from "./images/shuffle.png";
import loadingIcon from "./images/loading-icon.svg";
import axios from "axios";

function App() {
  const [text, setText] = useState([]);
  const [id, setId] = useState(0);
  const [excuse, setExcuse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [excuseEntryForm, setExcuseEntryForm] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

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

  const postData = () => {
    setExcuseEntryForm(false);
    setIsLoading(true);
    const payload = {
      name: name,
      feedback: feedback,
      rating: rating,
    };
    //console.log("payload", payload);
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbyg2ClNjXsVg-KFULKVKPKLeQH2BPefKb-RAoSelaVJQPFOi0Mew-fhj91wWieCccdBTA/exec?action=addFeedback`,
        payload
      )
      .then((res) => {
        console.log("here", res);
        if (res.data === "Success") {
          setIsLoading(false);
          setName("");
          setFeedback("");
          setRating("");
          alert("Thank You for your contribution! :)");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Oopsie! Try after some time :/");
      });
  };

  const handleChangeName = (e) => {
    const getName = e.target.value;
    setName(getName);
  };

  const handleChangeFeedback = (e) => {
    const getFeedback = e.target.value;
    setFeedback(getFeedback);
  };

  const handleChangeRating = (e) => {
    const getRating = e.target.value;
    setRating(getRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, feedback, rating);
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
          <source media="(min-width: 768px)" srcSet={pauseDesktop} />
          <img src={pauseMobile} alt="pause-mobile" />
        </picture>

        <div>
          <button onClick={fetchData}>
            <img src={dice} alt="dice" height={20} width={20} />
          </button>
        </div>
      </div>
      <div className="attribution">
        Coded by{" "}
        <a href="https://github.com/ssk090" target="_blank">
          Shivananda Sai
        </a>
        <p>
          You want to add your excuse to the list ?{" "}
          <a
            href="#"
            onClick={() => {
              setExcuseEntryForm(!excuseEntryForm);
            }}
          >
            Click Here
          </a>
        </p>
      </div>
      {excuseEntryForm && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label for="formGroupExampleInput">Name</label> */}
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Name"
                onChange={(e) => {
                  handleChangeName(e);
                }}
              />
            </div>
            <div className="form-group">
              {/* <label for="formGroupExampleInput2">Add your Excuse</label> */}
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Add your Excuse"
                onChange={(e) => {
                  handleChangeFeedback(e);
                }}
              />
            </div>
            <div className="form-group">
              {/* <label for="formGroupExampleInput2">Rating</label> */}
              <input
                type="number"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Rating out of 10 for this web app"
                min={0}
                max={10}
                onChange={(e) => {
                  handleChangeRating(e);
                }}
              />
            </div>
            <button
              onClick={postData}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
