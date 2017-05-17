import React from 'react';

function Person(props) {
    return (
        <button
            key={props.person.name}
            className={props.person.selected ? 'selected' : ''}
            onClick={props.onClick}
        >
            {props.person.name}
        </button>
    );
}

class PeopleList extends React.Component {

    render() {
        const object = this;
        const rows = this.props.persons.map(function (person, i) {
            return (<Person
                key={i}
                person={person}
                onClick={() => object.props.onPersonClick(i)}
            />)
        });
        return <div>{rows}</div>;
    }

}

function Selector(props) {
    return <div>
        <select onChange={props.onGroupClick}>
            <option value="2">Dvojice</option>
            <option value="3">Trojice</option>
            <option value="4">Čtveřice</option>
            <option value="5">Pětice</option>
            <option value="half">Poloviny</option>
            <option value="oneLine">Seřadit náhodně do řady</option>
        </select>
        <button onClick={props.onShuffleClick}>Zamíchat</button>
    </div>
}

class Result extends React.Component {
    render() {

        if (this.props.resultList) {
            let cols = [];
            for (let i = 0; i < this.props.resultList.length; i++) {
                const colItems = this.props.resultList[i].map((person, i) =>
                    <div key={person.name} className="person">
                        {i + 1}&nbsp;-&nbsp;{person.name}
                    </div>
                );
                cols.push(<div key={i} className="column">{colItems}</div>);
            }
            return <div className="resultList">{cols}</div>
        } else {
            return (
                <div>Vyber moznosti nahore</div>
            )
        }
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            resultList: null,
            grouping: 2,
            persons: [{
                name: 'Rája',
                selected: true,
            }, {
                name: 'myc-hal',
                selected: true,
            }, {
                name: 'Adam',
                selected: true,
            }, {
                name: 'Áda',
                selected: false,
            }, {
                name: 'Rozum',
                selected: true,
            }, {
                name: 'Déťa',
                selected: true,
            }, {
                name: 'Dvojka',
                selected: false,
            }, {
                name: 'Špunt',
                selected: false,
            }, {
                name: 'Váňa',
                selected: true,
            }, {
                name: 'Mára',
                selected: true,
            }, {
                name: 'Zdenda',
                selected: true,
            }, {
                name: 'Kolega',
                selected: true,
            }, {
                name: 'Pecik',
                selected: true,
            }, {
                name: 'Honza',
                selected: true,
            }, {
                name: 'Libor',
                selected: false,
            }],
        }
    }

    render() {
        return (
            <div>
                <PeopleList
                    persons={this.state.persons}
                    onPersonClick={i => this.selectPerson(i)}
                />
                <Selector
                    persons={this.state.persons}
                    onShuffleClick={() => this.onShuffleClick()}
                    onGroupClick={(e) => this.onGroupClick(e)}
                />
                <Result
                    resultList={this.state.resultList}
                />
            </div>
        );
    }

    selectPerson(i) {

        const persons = this.state.persons.slice();
        persons[i].selected = !persons[i].selected;
        this.setState({
            persons: persons,
        });

    }

    onGroupClick(event) {
        this.setState({
            grouping: event.target.value
        });
    }

    onShuffleClick() {
        let persons = this.state.persons.slice();
        persons = persons.map(function (p) {
            if (p.selected) {
                return p;
            }
            return null;
        }).filter(function (p) {
            return p;
        });

        persons = shuffle(persons);

        let result = [];

        if (this.state.grouping === 'oneLine') {
            result.push(persons);
            this.setState({
                resultList: result,
            });
            return;
        }

        let grouping = parseInt(this.state.grouping, 10);
        if (this.state.grouping === 'half') {
            grouping = Math.ceil(persons.length / 2);
        }

        for (let i = 0; i < Math.ceil(persons.length / grouping); i++) {
            result.push(persons.slice(i * grouping, (i * grouping) + grouping));
        }
        this.setState({
            resultList: result,
        });

    }

}

function shuffle(array) {
    let j = 0, temp = null;

    for (let i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export default Game;
