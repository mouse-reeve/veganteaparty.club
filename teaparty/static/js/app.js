var menu = [
    {
        count: 4,
        title: "Tea Selection",
        data: [
            {name: "Darjeeling"},
            {name: "Rose Petal Black"},
            {name: "Blackcurrant"},
            {name: "Rooibos"},
            {name: "Keemun"},
            {name: "Earl Grey"},
            {name: "Peppermint"}
        ]
    }, {
        count: 2,
        title: "Savories",
        data: [
            {name: "Some Bullshit Salad",
             content: "Argula I guess?"},
            {name: "Asparagus Mini Quiche",
             content: "Creamy walnut- and navy bean-based vegan quiche"},
        ]
    }, {
        count: 3,
        title: "Sandwiches",
        data: [
            {name: "Cucumber Cream Cheese",
             content: "Vegan cream cheese with sliced cucumber and dill on white bread"},
            {name: "Avocado Toast",
             content: "Sliced avocado on toasted walnut bread, topped with salt and cracked pepper"},
            {name: "Cheddar &amp; Pickle",
             content: "Miyoko's Rustic Alpine cashew cheese and pickles on toasted sourdough bread"}
        ]
    }, {
        count: 1,
        title: "Crumpets",
        data: [
            {name: "with Lemon Curd, Jam, Cashew Cream"}
        ]
    }, {
        count: 2,
        title: "Scones",
        data: [
            {name: "Lemon Ginger",
             content: "Lemon scone with candied ginger"},
            {name: "Raspberry",
             content: "Cream scone with fresh fruit"}
        ]
    }, {
        count: 3,
        title: "Sweets",
        data: [
            {name: "Rosemary Shortbread Cookies"},
            {name: "Peach Tartlettes"},
            {name: "Pistachio Rosewater Cookies"}
        ]
    },
];

var MenuItem = React.createClass({
    removeItem: function() {
        this.props.removeItem(this.props.itemId);
    },
    render: function() {
        var classname = "columns medium-" + this.props.columnValue;
        var content = '';
        console.log(this.props);
        if (this.props.content) {
            content = (
                <p>{this.props.content}</p>
            );
        }
        var recipe = '';
        if (this.props.recipe) {
            recipe = (
                <a className="recipe-link">Recipe &raquo;</a>
            );
        }
        return (
            <div className={classname}>
                <div className="menu-item" data-equalizer-watch>
                    <button className="close-button" aria-label="Close alert" type="button" onClick={this.removeItem}>
                          <span aria-hidden="true">&times;</span>
                    </button>
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
        var items = this.state.items;
        items[id] = {'name': 'fish sauce'};
        this.setState({items: items});
    },
    getInitialState: function() {
        return {
            population: this.props.data,
            items: this.props.data.splice(0, this.props.count)
        };
    },
    render: function() {
        var items = []
        var columnValue = 12 / this.props.count;
        for (var i=0; i < this.props.count; i++) {
            items.push(
                <MenuItem key={i} itemId={i} name={this.state.items[i].name} content={this.state.items[i].content} removeItem={this.removeItem} columnValue={columnValue} />
            );
        }

        return (
            <div className="section">
                <h2>{this.props.title}</h2>
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
            <div id="menu" className="block">
                <div className="menu-header">
                    <h1>Afternoon Tea Menu</h1>
                </div>
                {menu.map(function(section) {
                    return (
                        <Section key={section.title} title={section.title} data={section.data} count={section.count} />
                    );
                })}
                <div className="section menu-footer">
                    <h2>the end</h2>
                </div>
            </div>
        );
    }
});


ReactDOM.render(<Menu />, document.getElementById('menu'));

$(document).foundation();
