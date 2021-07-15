import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import dateFormat from "dateformat";
import MDEditor from "@uiw/react-md-editor";
import Imagecomponent from "./elements/ImageComponent";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import wikiApi from "../apis/wikiApi";

function Details({ params, wikis }) {
  const { id } = useParams();
  const [wiki, setWiki] = useState({});
  const [openImage, setOpenImage] = useState(false);
  const handleImageOpen = () => {
    setOpenImage(!openImage);
  };

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

  // Cases of access ways that
  // 1. from details page with the param
  // 2. from directly typed URL to edit a specific content by id
  useEffect(() => {
    if (wikis) {
      setWiki(() => {
        return wikis.find((p) => p.id == id);
      });
    } else if (params) {
      console.log(params);
      return setWiki(params.wiki);
    }
    return fetchWikis();
  }, []);

  return (
    <Card className="w-full h-screen p-4 mb-10 space-y-2 dark:bg-gray-400">
      <CardActionArea>
        <div className="flex w-full space-x-2">
          {/* Back to list button */}
          <Link to={"/"}>
            <Button variant="contained" color="secondary">
              <ArrowBackIosIcon />
              <p className="font-bold">Back to list</p>
            </Button>
          </Link>
          {/* Edit button */}
          <Link to={{ pathname: `/edit/${id}`, state: { wiki: wiki } }}>
            <Button variant="contained" color="primary">
              <EditIcon />
              <p className="pl-2 font-bold">Edit Wiki</p>
            </Button>
          </Link>
        </div>
        <div className="w-1/3 mt-4">
          {!openImage ? (
            <div className="w-1/3">
              <Imagecomponent
                component="img"
                image={wiki.image}
                alt="wiki image"
                title="wiki image title"
                className="w-full h-auto m-auto rounded-md md:w-2/6 md:float-left md:m-6"
                onClick={handleImageOpen}
              />
            </div>
          ) : (
            <div>
              <div className="w-1/3">
                <Imagecomponent
                  component="img"
                  image={wiki.image}
                  alt="wiki image"
                  title="wiki image title"
                  className="w-full h-auto rounded-md sm:w-2/6 md:float-left md:m-6"
                  onClick={handleImageOpen}
                />
              </div>
              <div className="w-full">
                <Imagecomponent
                  component="img"
                  image={wiki.image}
                  alt="wiki image"
                  title="wiki image title"
                  className="absolute inset-x-0 z-50 w-full h-auto mx-auto my-auto bg-white rounded-md shadow-xl"
                  onClick={handleImageOpen}
                />
              </div>
            </div>
          )}
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            className="overflow-hidden uppercase"
          >
            {wiki.title}
          </Typography>
          <div className="flex flex-col md:flex-row">
            <Typography gutterBottom variant="h6">
              Last Updated:{" "}
            </Typography>
            <Typography gutterBottom variant="h6">
              {dateFormat(wiki.created_at, "dS mmm yyyy, h:MM:ss TT")}
            </Typography>
          </div>
          <div className="flex flex-col md:flex-row">
            <Typography gutterBottom variant="h6">
              Last Updated By: {wiki.last_edited_author}
            </Typography>
          </div>
          <Typography variant="h5" color="textSecondary">
            <MDEditor.Markdown
              source={wiki.content}
              className="w-auto break-words dark:text-gray-300"
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="float-right">
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default Details;
