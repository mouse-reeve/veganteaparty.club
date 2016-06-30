$(document).foundation();

var menu = [
    {
        count: 4,
        title: "Teas",
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
        return (
            <div className={classname}>
                <div className="menu-item" data-equalizer-watch>
                    <button className="close-button" aria-label="Close alert" type="button" onClick={this.removeItem}>
                          <span aria-hidden="true">&times;</span>
                    </button>
                    <h3>{this.props.name}</h3>
                    {content}
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
            title: this.props.title,
            population: this.props.data,
            count: this.props.count,
            items: this.props.data.splice(0, this.props.count)
        };
    },
    render: function() {
        var items = []
        var columnValue = 12 / this.state.count;
        for (var i=0; i < this.state.count; i++) {
            items.push(
                <MenuItem key={i} itemId={i} name={this.state.items[i].name} content={this.state.items[i].content} removeItem={this.removeItem} columnValue={columnValue} />
            );
        }

        return (
            <div className="section">
                <h2>{this.state.title}</h2>
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
        console.log(menu);
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
            </div>
        );
    }
});


ReactDOM.render(<Menu />, document.getElementById('menu'));
