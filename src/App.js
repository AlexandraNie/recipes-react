
import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4';
import MyRecipesComponents from './MyRecipesComponent';



function App() {
  const MY_ID ="1b5cfebf";
  const MY_KEY = "55f9b57e31ed2d7d3e8837a7dde0e63b%09";
  
//7
  const[mySearch, setMySearch] = useState("");
//8
  const[myRecipes, setMyRecipes] = useState([]);
  const[wordSubmitted, setWordSubmitted] = useState('avocado');
//1
  useEffect(() => {
    const getRecipe = async() => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
//10
      setMyRecipes(data.hits);
  }
    getRecipe()
  }, [wordSubmitted])

  //6
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault()
    setWordSubmitted(mySearch)
  }
  

//2
  return (
  <div className="App">
    <div className="container">

    <video autoPlay muted loop>
    <source src={video} type="video/mp4" />
    </video>
    <h1>Find a Recipe</h1>
    </div>
    
  
  <div className='container'>
    <form onSubmit={finalSearch}>
         <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}/>
    </form>
</div>


<div className='container'>
     <button onClick={finalSearch}>
         <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
      </button>
</div>

  {myRecipes.map((element, index) => (
  <MyRecipesComponents key={index}
  label={element.recipe.label} 
  image={element.recipe.image} 
  ingredients={element.recipe.ingredientLines}
  calories={element.recipe.calories} />
))}
</div>
  
  );
}

export default App;

