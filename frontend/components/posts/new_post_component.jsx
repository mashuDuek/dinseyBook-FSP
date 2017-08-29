import React from 'react';

class NewPostComponent extends React.Component {

  constructor(props) {
    debugger
    super(props);
    this.state = {
        body: '',
        receiver_id: this.props.currentUser.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.create(this.state);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState(
      Object.assign({}, this.state, { body: e.target.value})
    );
  }

  render() {
    const placeHolder = `What's on your mind, ${this.props.currentUser.name}?`
    return(
      <form onSubmit={this.handleSubmit} className="create-post">
        <textarea
          placeholder={placeHolder}
          height="100"
          width="500"
          value={this.state.body}
          onChange={this.handleChange}
          ></textarea>
        <button>
          Post
        </button>
      </form>
    );
  }
}

export default NewPostComponent;
