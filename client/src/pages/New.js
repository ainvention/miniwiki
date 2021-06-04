import { useState, useRef } from "react";
import WikiInput from "../components/WikiInput";
import { useDispatch } from "react-redux";
import { addWiki } from "../store/wikiSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function New() {
  const [loading, setLoading] = useState(false);
  const [marktext, setMarktext] = useState("");

  const titleInputRef = useRef("");
  const imageInputRef = useRef("");
  const contentInputRef = useRef("");

  const title = titleInputRef.current.value;
  const image = imageInputRef.current.value;
  const content = contentInputRef.current.value;
  const created = new Date();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const submitForm = async (e) => {
    e.preventDefault();

    if (title === "" || image === "" || content === "") return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://60b7479217d1dc0017b897a2.mockapi.io/api/v1/wikis",
        {
          method: "POST",
          body: JSON.stringify({ title, image, content, created }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      dispatch(addWiki(data));

      titleInputRef.current.value = "";
      imageInputRef.current.value = "";
      contentInputRef.current.value = "";

      setMarktext("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {user ? (
        <WikiInput
          submitForm={submitForm}
          titleInputRef={titleInputRef}
          imageInputRef={imageInputRef}
          marktext={marktext}
          setMarktext={setMarktext}
          loading={loading}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default New;
