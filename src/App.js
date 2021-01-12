import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

//사용 안함----------------------------------------------------------------------------------------------------------
const foodILike = [
  {
    id: 1,
    name: "Kimchi",
    image: "https://www.maangchi.com/wp-content/uploads/2014/09/kimchi.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Samgyeopsal",
    image:
      "https://1.bp.blogspot.com/-pNQI_9YAcJM/VBTxavO6YMI/AAAAAAAACk4/-OHN-keA9UU/s1600/20140909_204156.jpg",
    rating: 5.5,
  },
  {
    id: 3,
    name: "Bibimbap",
    image:
      "https://images.thestar.com/content/dam/thestar/life/food_wine/recipes/2010/05/04/bibimbap/bibimbap.jpeg.size-custom-crop.1086x0.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Doncasu",
    image:
      "https://s3-media4.fl.yelpcdn.com/bphoto/anesu6IAyAj2d6r19eFqEg/o.jpg",
    rating: 4,
  },
];

// ※ Food는 컴포넌트임. 컴포넌트의 첫글자는 대문자로 작성해야함.
// image element는 alt prop이 반드시 있어야함. 이것은 시각장애인을 위함.
function Food({ name, picture, rating }) {
  //props.fav == {favorit} 같음! 무엇을 써도 무방  // props : property의 줄임말. Food의 속성을 뜻함.
  return (
    <div>
      <h2>I like {name} </h2>
      <h4>{rating}/5.0</h4>
      <img src={picture} alt={name} />
    </div>
  );
}

// Food컴포넌트의 prop들의 요구되는 형식 규정
Food.propTypes = {
  name: PropTypes.string.isRequired, // name 은 string형식이어야한다~ 라는 뜻.
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number, // isRequired가 붙지 않는다면 형식이 필수는 아니라는 뜻 (number 또는 undefind 가능. string 불가능)
};

/*function App() {
  return (
    <div>
      {foodILike.map((dish) => (
        <Food
          key={dish.id}
          name={dish.name}
          picture={dish.image}
          rating={dish.rating}
        />
      ))}
    </div>
  );
}*/

//-------------------------------------------------------------------------------------------------------------------

// 클래스 컴포넌트. state를 가짐
class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  // async: 이 함수가 비동기임을 뜻 함. 기다려야해!,  await: 무엇을 기다려야해? axios!
  getMovies = async () => {
    // data/data/movies를 가져와서 잡아라
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    ); //fetch() : 데이터를 보내고 받는 함수. 비슷한것으로 더 자주 사용하는 Axios라고 부르는게 있음.

    this.setState({ movies, isLoading: false }); //state를 가져온 movies로 바꿔주고, 로딩도 끝났다고 바꿔준다.
  };

  componentDidMount() {
    this.getMovies();

    /*// setTimeout:  딜레이 함수
    // 6초뒤에 isLoading = false로 변화
     setTimeout(() => {
      this.setState({ isLoading: false });
    }, 6000); */
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section class="Container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">Loading...</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id} //각각의 child는 항상 키값을 가져야함
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  /* //컴포넌트가 맨처음 생성됐을때 한번 실행되는 함수
  constructor(props) {
    super(props);
    console.log("hello");
  }
  // add버튼을 클릭해서 state를 변경하고싶다면 setState를 사용해야함( 직접 변경X )
  // setState를 호출하면 react는 state를 refresh하고 또한 render funtion을 호출하여 html에서 바뀐부분만(state가 바뀌었으니 state만) 다시 랜더함.
  add = () => {
    console.log("ADD");
    this.setState((current) => ({ count: current.count + 1 }));
  };
  minus = () => {
    console.log("minus");
    this.setState((current) => ({ count: current.count - 1 }));
  };
  // render함수가 처음 실행된 후에 한번 호출되는 함수
  componentDidMount() {
    console.log("component render");
  }
  // 업데이트가 될때마다(버튼클릭을 할 때 마다) render함수 다음으로 실행되는 함수
  componentDidUpdate() {
    console.log("I am Updated");
  }
  componentWillUnmount() {
    console.log("Goodbye, cruel word");
  }
  render() {
    return (
      <div>
        <h1> The number is: {this.state.count} </h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  } */
}

export default App;
//--------------------------------------------------------------------------------------------------------------------
