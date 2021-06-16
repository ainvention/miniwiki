import { useState, useEffect } from "react";
import wikiApi from "../apis/wikiApi";
import { Button, TextField } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import { LoadingSpinner } from "../assets/icons";
import { useParams, useHistory } from "react-router-dom";

function Edit({ wikis, params, props }) {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const initialWiki = {
    title: "",
    image: "",
    content: "",
  };

  const [wiki, setWiki] = useState(initialWiki);

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
        title: wiki.title,
        image: wiki.image,
        content: wiki.content,
      })
      .then((response) => {
        setLoading(false);
        window.alert("Edit success!");
        return history.push(`/details/${id}`);
      })
      .catch((e) => {
        if (e.response) {
          console.log("error occurred!", e.response);
        }
      });
  };

  // Cases of access ways that
  // 1. from details page with the parameter wikis
  // 2. from directly typed URL to edit a specific content by id
  useEffect(() => {
    if (wikis) {
      setWiki(() => {
        return wikis.find((p) => p.id == id);
      });
    }
    //in case of directly page access with id: "/edit/id"
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
          value={wiki.title}
          onChange={(e) =>
            setWiki((prevWiki) => {
              return {
                ...prevWiki,
                title: e.target.value,
              };
            })
          }
          className="rounded-l-lg dark:text-gray-200"
          disabled={loading}
          required
        />
        <TextField
          value={wiki.image}
          onChange={(e) =>
            setWiki((prevWiki) => {
              return {
                ...prevWiki,
                image: e.target.value,
              };
            })
          }
          className="rounded-r-lg dark:text-gray-200"
          disabled={loading}
          required
        />
        <MDEditor
          label="Content"
          value={wiki.content}
          onChange={(e) =>
            setWiki((prevWiki) => {
              return {
                ...prevWiki,
                content: e,
              };
            })
          }
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
