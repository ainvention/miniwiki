import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const UserCard = ({ user, URL }) => {
  return (
    <Card className="w-full bg-gray-400 dark:bg-gray-700" key={user.id}>
      <CardContent className="space-y-4">
        <img
          src={URL + user.avatar.url}
          alt="author_avatar"
          className="w-12 h-12 rounded-full"
        />
        <Typography
          className="flex flex-row dark:text-gray-400"
          color="textSecondary"
        >
          <Typography variant="h4" component="h2">
            {user.username}
            <p className="text-lg font-bold">{user.email}</p>
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
