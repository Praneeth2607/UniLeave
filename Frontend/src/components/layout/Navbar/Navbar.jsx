import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../common/Button/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand">UniLeave</span>
      </div>

      <div className="navbar-right">
        {user && (
          <Button
            variant="ghost"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
