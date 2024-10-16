import React from "react";
import { Movies } from "../components/Movies";
import { Preloader } from "../components/Preloader";
import { Search } from "../components/Search";

const API_KEY = process.env.REACT_APP_API_KEY;
class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
  };

  componentDidMount() {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
      .then((Response) => Response.json())
      .then((data) => this.setState({ movies: data.Search }));
  }

  searchMovies = (str = "matrix", type = "all") => {
    this.setState({ loading: true });
    fetch(
      `http://www.omdbapi.com/?apikey=1e7965a5&s=${
        str !== "" ? str : "matrix"
      }${type !== "all" ? `&type=${type}` : ""}`
    )
      .then((Response) => Response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }));
  };

  render() {
    const { movies, loading } = this.state;

    return (
      <main className="container content">
        <Search searchMovies={this.searchMovies} />
        {loading ? <Preloader /> : <Movies movies={this.state.movies} />}
      </main>
    );
  }
}
export { Main };
