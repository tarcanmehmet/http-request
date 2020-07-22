import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPostId: null,
      error: false,
    };
  }
  componentDidMount() {
    const response = axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const uptadetedPost = posts.map((post) => {
          return {
            ...post,
            author: "Mehmet",
          };
        });
        this.setState({
          posts: uptadetedPost,
        });
      })
      .catch((error) =>
        this.setState({
          error: true,
        })
      );
  }
  postClickedHandler = (id) => {
    this.setState({
      selectedPostId: id,
    });
  };
  render() {
    const posts = this.state.posts.map((item) => {
      return (
        <Post
          key={item.id}
          title={item.title}
          author={item.author}
          clicked={() => this.postClickedHandler(item.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost
            id={this.state.selectedPostId}
            errorState={this.state.error}
          />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
