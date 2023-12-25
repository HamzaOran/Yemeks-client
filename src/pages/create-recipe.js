import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(['access_token']);

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/recipes`, recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert('Tarif Eklendi');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h1>Tarif Oluştur</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Ad</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Malzemeler</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            className="malzeme"
            type="text"
            key={index}
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button className="button" onClick={addIngredient} type="button">
          Ekle
        </button>
        <label htmlFor="instructions">Yapılışı</label>
        <textarea
          name="instructions"
          id="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Resim</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Pişirme Süresi(dk)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Gönder
        </button>
      </form>
    </div>
  );
};
