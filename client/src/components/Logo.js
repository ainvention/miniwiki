import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/">
        <img
          alt="cemit logo"
          src="https://cemit.com/wp-content/themes/cemit/assets/img/cemit-logo.svg"
          className="w-20 h-auto"
        />
      </Link>
    </div>
  );
}

export default Logo;
