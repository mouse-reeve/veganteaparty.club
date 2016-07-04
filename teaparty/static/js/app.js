var MenuItem = React.createClass({
    removeItem: function() {
        this.props.removeItem(this.props.itemId);
    },
    render: function() {
        var classname = "columns medium-" + this.props.columnValue;
        var content = '';
        if (this.props.content) {
            content = (
                <p>{this.props.content}</p>
            );
        }
        var recipe = '';
        if (this.props.recipe) {
            recipe = (
                <a href={this.props.recipe} className="recipe-link">Recipe &raquo;</a>
            );
        }
        var button = ''
        if (this.props.showButton > 0) {
            button = (
                <button className="close-button" aria-label="Close alert" type="button" onClick={this.removeItem}>
                      <span aria-hidden="true">&times;</span>
                </button>
            );
        }
        return (
            <div className={classname}>
                <div className="menu-item" data-equalizer-watch>
                    {button}
                    <h3>{this.props.name}</h3>
                    {content}
                    {recipe}
                </div>
            </div>
        );
    }
});

var Section = React.createClass({
    removeItem: function(id) {
        if (!this.state.available.length) {
            return;
        }
        var item = this.state.items[id];
        var available = this.state.available;
        var replacement = available.pop();
        available.unshift(item);

        var items = this.state.items;
        items[id] = replacement;
        this.setState({
            population: this.state.population,
            items: items,
            available: available
        });
    },
    getInitialState: function() {
        return {
            population: this.props.data,
            items: this.props.data.splice(0, this.props.count),
            available: this.props.data
        };
    },
    render: function() {
        var items = []
        var columnValue = 12 / this.props.count;
        for (var i=0; i < this.props.count; i++) {
            items.push(
                <MenuItem key={i}
                          itemId={i}
                          name={this.state.items[i].name}
                          content={this.state.items[i].content}
                          recipe={this.state.items[i].recipe}
                          removeItem={this.removeItem}
                          columnValue={columnValue}
                          showButton={this.state.available.length > 0}/>
            );
        }

        var subtitle = '';
        if (this.props.subtitle) {
            subtitle = (
                <p>{this.props.subtitle}</p>
            );
        }

        return (
            <div className="section">
                <h2>{this.props.title}</h2>
                {subtitle}
                <div className="row" data-equalizer>
                    {items}
                </div>
            </div>
        );
    }
});

var Menu = React.createClass({
    getInitialState: function() {
        return {
            menu: menu
        };
    },
    render: function() {
        var menu = this.state.menu;
        return (
            <div>
                {menu.map(function(section) {
                    return (
                        <Section key={section.title}
                                 title={section.title}
                                 subtitle={section.subtitle}
                                 data={section.data}
                                 count={section.count} />
                    );
                })}
            </div>
        );
    }
});


ReactDOM.render(<Menu />, document.getElementById('items'));

$(document).foundation();
