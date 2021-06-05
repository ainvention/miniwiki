import { useState, useRef } from "react";
import WikiInput from "../components/WikiInput";
import { useDispatch } from "react-redux";
import { addWiki } from "../store/wikiSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import wikiApi from "../apis/wikiApi";
import Alert from "@material-ui/lab/Alert";

function New() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [marktext, setMarktext] = useState("");

  const titleInputRef = useRef("");
  const imageInputRef = useRef("");
  const contentInputRef = useRef("");

  const title = titleInputRef.current.value;
  const image = imageInputRef.current.value;
  const content = contentInputRef.current.value;
  const first_author = user.username;

  const submitForm = async (e) => {
    e.preventDefault();

    if (title === "" || image === "" || content === "") return;
    setLoading(true);

    //set Loading and show error Alert
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }, 6000);

    wikiApi
      .post(
        "/wikis",
        {
          title: title,
          image: image,
          content: content,
          first_author: first_author,
        },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        setLoading(false);
        titleInputRef.current.value = "";
        imageInputRef.current.value = "";
        contentInputRef.current.value = "";
        setMarktext("");
      })
      .catch((e) => {
        console.log("An error occurred during in the post a wiki:", e.response);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          {open && (
            <Alert severity="error">
              Posting error!! try again or contact administrator.
            </Alert>
          )}
          <WikiInput
            submitForm={submitForm}
            titleInputRef={titleInputRef}
            imageInputRef={imageInputRef}
            marktext={marktext}
            setMarktext={setMarktext}
            loading={loading}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default New;
