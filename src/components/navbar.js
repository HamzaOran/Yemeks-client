import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('userID');
    navigate('/auth');
  };

  return (
    <div className="navbar">
      <Link to="/">Yemeks</Link>
      <Link to="/create-recipe">Yeni Tarif</Link>

      {!cookies.access_token ? (
        <Link to="/auth">
          <button className="button">Giriş</button>
        </Link>
      ) : (
        <>
          <Link to="/saved-recipes">Listem</Link>
          <button className="button" onClick={logout}>
            Çıkış
          </button>
        </>
      )}
    </div>
  );
};
