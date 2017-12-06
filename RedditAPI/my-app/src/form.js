import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      parsedPosts: [],
      parsedComments: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    // this.parsePosts = this.parsePosts.bind(this);
  }

  updateUsername(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }


  //  Title, Score, and link to the post.
  parsePosts(data) {
    let parsedPosts = [];
    data.data.children.forEach(function(post) {
      let postInfo = {};
      postInfo.title = post.data.title;
      postInfo.score = post.data.score;
      postInfo.url = post.data.url;
      parsedPosts.push(postInfo);
    })
    // this.state.parsedPosts.push(parsedPosts);
    console.log(parsedPosts);
    this.setState({
      parsedPosts: parsedPosts
    });
  }

  fetchPosts(username) {
    fetch(`https://www.reddit.com/user/${username}/submitted.json`)
    .then(res => res.json())
    .then(data => this.parsePosts(data));
  }

  fetchComments() {
    fetch(`https://www.reddit.com/user/${this.state.username}/comments.json`)
    .then(res => res.json())
    .then(data => console.log(data));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username);
    this.fetchPosts(this.state.username);
  }

  render() {
    // console.log(this.state);
    let allPosts;
    if (this.state.parsedPosts.length !== 0){
      allPosts = this.state.parsedPosts.map(function(post, idx) {
        return(
          <li key={idx}>{post.score}, {post.title}, {post.url}</li>
        )
      })
    }

    console.log('allPosts', allPosts);
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.updateUsername}></input>
          <input type="submit" value="submit"></input>
        </form>

        <ul>
          {allPosts}
        </ul>
      </div>
    )
  }
}

export default Form;
