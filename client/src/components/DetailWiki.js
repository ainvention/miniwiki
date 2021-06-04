import React from "react";
import { useDispatch, useSelector } from "react-redux";

import MDEditor from "@uiw/react-md-editor";
import dateFormat from "dateformat";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function DetailWiki() {
  const wiki = useSelector((state) => state.wikis.wikis);
  return (
    <Card className="w-full" key={wiki.id}>
      <CardContent className="space-y-4">
        <Typography variant="h4" component="h2">
          {wiki.title}
        </Typography>
        <Typography className="flex flex-row" color="textSecondary">
          <img
            src={wiki.author_avatar}
            alt="author_avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="mx-2">
            <p className="text-lg font-bold">{wiki.author}</p>
            Last update: {dateFormat(wiki.created, "dS mmm yyyy, h:MM:ss TT")}
          </div>
        </Typography>
        <Typography variant="body2" component="p" className="truncate">
          <MDEditor.Markdown source={wiki.content} />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DetailWiki;
