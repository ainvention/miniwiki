import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import wikiApi from "../apis/wikiApi";
import Alert from "@material-ui/lab/Alert";
import { LoadingSpinner } from "../assets/icons";
import { Button, TextField } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";

function New() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [markText, setMarkText] = useState("");
  const titleInputRef = useRef("");
  const imageInputRef = useRef("");
  let firstAuthor = "";

  const submitForm = async (e) => {
    e.preventDefault();

    if (user) {
      firstAuthor = user.username;
    }

    if (titleInputRef === "" || imageInputRef === "" || markText === "") return;
    setLoading(true);

    // Server response timeout manually checking with <Alert/> component.
    setTimeout(() => {
      setLoading(false);
      //error alert showing
      setOpen(true);
      setTimeout(() => {
        //error alert close
        setOpen(false);
      }, 5000);
    }, 6000);

    wikiApi
      .post("/wikis", {
        title: titleInputRef.current.value,
        image: imageInputRef.current.value,
        content: markText,
        first_author: firstAuthor,
      })
      .then((response) => {
        setLoading(false);
        titleInputRef.current.value = "";
        imageInputRef.current.value = "";
        setMarkText("");
      })
      .catch((e) => {
        if (e.response) {
          console.log(
            "An error occurred during in the post a wiki:",
            e.response
          );
        }
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
          <div className="mb-2 sm:mb-10">
            <span className="mb-20 text-2xl font-bold text-gray-600 dark:text-gray-300">
              Edd New Wiki
            </span>
          </div>
          <form onSubmit={submitForm} className="flex flex-col w-full">
            <TextField
              label="Title"
              type="text"
              className="rounded-l-lg dark:text-gray-200"
              placeholder="type this subject"
              inputRef={titleInputRef}
              disabled={loading}
              required
            />
            <TextField
              label="Image Url"
              type="text"
              className="rounded-r-lg dark:text-gray-200"
              placeholder="type image URL.. ex) https://www.google.com/images/272x92dp.png"
              inputRef={imageInputRef}
              disabled={loading}
            />
            <MDEditor
              label="Content"
              value={markText}
              onChange={setMarkText}
              className="flex-1 h-full p-2 my-4 border-2 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-200"
              disabled={loading}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}
              className="dark:bg-red-800"
            >
              {loading && <LoadingSpinner className="spinner" />}
              {loading ? "Adding" : "Confirm"}
            </Button>
          </form>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default New;
