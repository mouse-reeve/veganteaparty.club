var MenuItem = React.createClass({
    removeItem: function() {
        this.props.removeItem(this.props.itemId);
    },
    render: function() {
        var classname = "columns medium-" + this.props.columnValue;
        var content = '';
        if (this.props.data.content) {
            content = (
                <p>{this.props.data.content}</p>
            );
        }
        var recipe = '';
        if (this.props.data.recipe) {
            recipe = (
                <a href={this.props.data.recipe} className="recipe-link">Recipe &raquo;</a>
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
                    <h3>{this.props.data.name}</h3>
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

        this.props.updateSeason(replacement.seasons || [], item.seasons || []);
        var items = this.state.items;
        items[id] = replacement;
        this.setState({
            population: this.state.population,
            items: items,
            available: available
        });
    },
    sendSeasons: function(items, remove) {
        var seasonlist = [];
        items.map(function (item) {
            if (item.seasons && item.seasons.length) {
                seasonlist = seasonlist.concat(item.seasons);
            }
        });

        if (seasonlist.length) {
            this.props.addSeasons(seasonlist);
        }
    },
    getInitialState: function() {
        var items = this.props.data.splice(0, this.props.count);
        this.sendSeasons(items);
        return {
            population: this.props.data,
            items: items,
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
                          data={this.state.items[i]}
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
    seasons: {"winter": 0, "spring": 0, "summer": 0, "fall": 0},
    addSeasons: function(seasonlist) {
        // catalog the initial season counts
        seasonlist.map(function(item) {
            this.seasons[item] += 1;
        }, this);
    },
    updateSeason: function(add, remove) {
        add.map(function(item) {
            this.seasons[item] += 1;
        }, this);
        remove.map(function(item) {
            this.seasons[item] -= 1;
        }, this);

        var seasons = this.seasons;
        var season = Object.keys(seasons).reduce(function(a, b){ return seasons[a] > seasons[b] ? a : b });
        this.setState({
            season: season
        });
    },
    getInitialState: function() {
        return {
            menu: menu,
            season: "summer"
        };
    },
    render: function() {
        var menu = this.state.menu;
        return (
            <div>
                <div id="season" className={this.state.season}></div>

                {menu.map(function(section) {
                    return (
                        <Section key={section.title}
                                 title={section.title}
                                 subtitle={section.subtitle}
                                 data={section.data}
                                 updateSeason={this.updateSeason}
                                 addSeasons={this.addSeasons}
                                 count={section.count} />
                    );
                }, this)}
            </div>
        );
    }
});


ReactDOM.render(<Menu />, document.getElementById('items'));

$(document).foundation();
