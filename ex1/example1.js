var TodoList = React.createClass({
  render: function() {
    var items = this.props.items;
    var lis = [];

    for (var index in items) {
      lis.push(<li>{items[index]}</li>);
    }

    return <ul>{lis}</ul>;
  }
});

var TodoApp = React.createClass({

  getInitialState: function() {
    return {
      items: [], 
      text: ''
    };
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },

  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp />, document.getElementById("mount"));
