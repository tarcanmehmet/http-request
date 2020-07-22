import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    response: null,
  };
  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.response ||
        (this.state.response && this.state.response.id !== this.props.id)
      ) {
        axios.get(`/posts/${this.props.id}`).then((response) =>
          this.setState({
            response: response.data,
          })
        );
      }
    }
  }
  postDeleteHandler = (id) => {
    axios
      .delete(`/posts/${this.props.id}`)
      .then((response) => console.log(response));
  };
  render() {
    let post;
    if (this.props.errorState) {
      post = <p style={{ textAlign: "center" }}>Something went wrong!!!</p>;
    } else {
      post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
      if (this.props.id) {
        post = <p style={{ textAlign: "center" }}>Loading...</p>;
      }
      if (this.state.response) {
        post = (
          <div className="FullPost">
            <h1>{this.state.response.title}</h1>
            <p>{this.state.response.body}</p>
            <div className="Edit">
              <button className="Delete" onClick={this.postDeleteHandler}>
                Delete
              </button>
            </div>
          </div>
        );
      }
    }

    return post;
  }
}

export default FullPost;
