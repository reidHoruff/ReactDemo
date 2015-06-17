var Comment = React.createClass({
  getInitialState: function() {
    return {
      name: null,
      comment: null,
      children: [],
      time: -1,
      show_input: false,
      reply_body_value: '',
      reply_name_value: '',
    }
  },

  componentWillMount: function() {
    /*
     * copy children from props into state
     */
    if (Array.isArray(this.props.children)) {
      this.setState({children: this.props.children.concat()});
    } else {
      this.setState({children: [this.props.children]});
    }
  }, 

  handleChange: function(type, event) {
    if (type == 'body') {
      this.setState({reply_body_value: event.target.value});
    } else if (type == 'name') {
      this.setState({reply_name_value: event.target.value});
    }
  },

  replyClicked: function() {
    this.setState({show_input: true});
  },

  submitClicked: function() {
    var newComment = 
      <Comment name={this.state.reply_name_value} comment={this.state.reply_body_value} />;

    this.setState({
      children : this.state.children.concat(newComment),
      show_input: false,
    });
  },

  render: function() {
    var reply = this.state.show_input ?
      <div className="replybox">
        <input value={this.state.reply_name_value} onChange={this.handleChange.bind(this, 'name')}></input>
        <textarea value={this.state.comment_value} onChange={this.handleChange.bind(this, 'body')}></textarea>
        <br/>
        <button onClick={this.submitClicked}>submit</button>
      </div>
      :
      <a href="#" onClick={this.replyClicked}>reply</a>;

    return (
        <div className="comment">
          <h4>{this.props.name}</h4>
          <p>{this.props.comment}</p>
          {reply}
          {this.state.children}
        </div>
        );
  },


});

var Comments = React.createClass({
  render: function() {
    return (
        <div className="comments">
          <h1>Comments</h1>
          {this.props.children}
        </div>
      );
  },
});

var dom = (
    <Comments>
      <Comment name='bob' comment='hello world'>
        <Comment name='john' comment='hello world reply'>
          <Comment name='suzie' comment='hello world' />
        </Comment>
        <Comment name='greg' comment='hello world' />
      </Comment>
      <Comment name='marry' comment='hello world' />
    </Comments>
);

React.render(dom, document.getElementById("mount"));
