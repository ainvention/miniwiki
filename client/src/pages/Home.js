import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWikis } from "../store/wikiSlice";

import { Redirect } from "react-router-dom";
import WikiList from "../components/WikiList";

import wikiApi from "../apis/wikiApi";

function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { wikis } = useSelector((state) => state.wikis);
  const URL = process.env.REACT_APP_URL_STRAPI;

  const fetchWikis = async () => {
    setLoading(true);
    wikiApi
      .get("/wikis")
      .then((response) => {
        // Handle success.
        dispatch(setWikis(response.data));
        setLoading(false);
      })
      .catch((e) => {
        // Handle error.
        console.log("An error occurred:", e.response);
      });
  };

  useEffect(() => {
    if (user) {
      fetchWikis();
    } else {
      return;
    }
  }, []);

  return (
    <div>
      {user ? (
        <WikiList wikis={wikis} loading={loading} URL={URL} />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default Home;
