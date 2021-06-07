import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import wikiApi from "../apis/wikiApi";
import Alert from "@material-ui/lab/Alert";
import { LoadingSpinner } from "../assets/icons";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MDEditor from "@uiw/react-md-editor";

function New() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [marktext, setMarktext] = useState("");
  const titleInputRef = useRef("");
  const imageInputRef = useRef("");
  let firstAuthor = "";

  const submitForm = async (e) => {
    e.preventDefault();

    if (user) {
      firstAuthor = user.username;
    }

    if (titleInputRef === "" || imageInputRef === "" || marktext === "") return;
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
        content: marktext,
        first_author: firstAuthor,
      })
      .then((response) => {
        setLoading(false);
        titleInputRef.current.value = "";
        imageInputRef.current.value = "";
        setMarktext("");
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
          <form onSubmit={submitForm} className="flex flex-col w-full">
            <Input
              type="text"
              className="rounded-l-lg dark:text-gray-200"
              placeholder="Title"
              inputRef={titleInputRef}
              disabled={loading}
              required
            />
            <Input
              type="text"
              className="rounded-r-lg dark:text-gray-200"
              placeholder="Image URL.. ex) https://www.google.com/images/272x92dp.png"
              inputRef={imageInputRef}
              disabled={loading}
            />
            <MDEditor
              value={marktext}
              onChange={setMarktext}
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
