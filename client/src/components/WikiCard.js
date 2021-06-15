import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const WikiCard = ({ wiki, URL }) => {
  const [showContent, setShowContent] = useState(false);
  const { id } = useParams();

  let detailPageData = {
    pathname: `/details/${wiki.id}`,
    state: { wiki: wiki },
  };

  if (id) {
    detailPageData = {
      pathname: `/details/${id}`,
      state: { wiki: wiki, id: id },
    };
  }

  return (
    <div className="w-full">
      <Link to={detailPageData}>
        <Card className="w-full p-1 my-2 dark:bg-gray-500 sm:p-2" key={wiki.id}>
          <Tooltip
            title="Learn More"
            placement="bottom-start"
            disableFocusListener
            disableTouchListener
          >
            <CardContent
              className="p-2 space-y-4 rounded-md dark:bg-gray-400"
              onClick={() => setShowContent(!showContent)}
            >
              <Typography variant="h4">{wiki.title}</Typography>
              <div className="flex flex-col w-full mx-2 space-y-2 ">
                <img
                  src={wiki.image}
                  alt="wiki"
                  className="w-40 h-40 rounded-md"
                />
                <span className="text-lg font-bold">
                  Last edited by: {wiki.last_edited_author}
                </span>
                Last update:{" "}
                {dateFormat(wiki.created_at, "dS mmm yyyy, h:MM:ss TT")}
              </div>
            </CardContent>
          </Tooltip>
        </Card>
      </Link>
    </div>
  );
};

export default WikiCard;
