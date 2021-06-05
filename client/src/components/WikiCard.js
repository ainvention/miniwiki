import { useState } from "react";

import dateFormat from "dateformat";

import MDEditor from "@uiw/react-md-editor";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

const WikiCard = ({ wiki, URL }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <Card className="w-full my-2" key={wiki.id}>
      <Tooltip
        title="Learn More"
        placement="bottom-start"
        disableFocusListener
        disableTouchListener
      >
        <CardContent
          className="space-y-4"
          onClick={() => setShowContent(!showContent)}
        >
          <div className="space-y-4">
            <Typography variant="h4" component="h2">
              {wiki.title}
            </Typography>
            <img src={wiki.image} alt="author_avatar" className="w-40 h-40" />
          </div>
          <Typography className="flex flex-row" color="textSecondary">
            <div className="flex flex-col w-full mx-2">
              <span className="text-lg font-bold">
                Last edited by: {wiki.last_edited_author}
              </span>
              Last update:{" "}
              {dateFormat(wiki.created_at, "dS mmm yyyy, h:MM:ss TT")}d
            </div>
          </Typography>
          {showContent && (
            <div className="p-4 bg-gray-100">
              <MDEditor.Markdown source={wiki.content} />
            </div>
          )}
        </CardContent>
      </Tooltip>
      <Divider />
    </Card>
  );
};

export default WikiCard;
