import { useState, useEffect, useRef } from "react";
import wikiApi from "../apis/wikiApi";
import { Button, TextField } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import { LoadingSpinner } from "../assets/icons";
import { useParams } from "react-router-dom";

function Edit({ wikis, params }) {
  const { id } = useParams();
  const [wiki, setWiki] = useState({});
  const [loading, setLoading] = useState(false);
  const [markText, setMarkText] = useState("");
  const titleInputRef = useRef("");
  const imageInputRef = useRef("");

  const fetchWikis = async () => {
    // setLoading(true);
    wikiApi
      .get(`/wikis/${id}`)
      .then((response) => {
        setWiki(response.data);
      })
      .catch((e) => {
        // Handle error.
        console.log("An error occurred:", e.response);
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // const wiki = wikis
    wikiApi
      .put(`/wikis/${wiki.id}`, {
        title: titleInputRef.current.value,
        image: imageInputRef.current.value,
        content: markText,
      })
      .then((response) => {
        setLoading(false);
        titleInputRef.current.value = "";
        imageInputRef.current.value = "";
        setMarkText("");
        window.alert("Edit success!");
        console.log("success");
      })
      .catch((e) => {
        if (e.response) {
          console.log("error occurred!", e.response);
        }
      });
  };

  // Cases of access ways that
  // 1. from details page with the param
  // 2. from directly typed URL to edit a specific content by id
  useEffect(() => {
    if (wikis) {
      setWiki(() => {
        wikis.find((p) => p.id == id);
      });
    } else if (params) {
      setWiki(params.wiki);
    }
    return fetchWikis();
  }, []);

  return (
    <div>
      <div className="mb-2 sm:mb-10">
        <span className="mb-20 text-2xl font-bold text-gray-600 dark:text-gray-300">
          Edit Wiki
        </span>
      </div>
      <form onSubmit={submitForm} className="flex flex-col w-full">
        <TextField
          type="text"
          className="rounded-l-lg dark:text-gray-200"
          placeholder={wiki.title}
          inputRef={titleInputRef}
          disabled={loading}
          required
        />
        <TextField
          type="text"
          className="rounded-r-lg dark:text-gray-200"
          placeholder={wiki.image}
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
  );
}

export default Edit;
