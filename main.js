
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var MainView = React.createClass({    
    getInitialState: function() {
        return {
            text: "",
            topics: this.props.topics
        };
    },

    generate: function() {
        var i = Math.floor(Math.random() * (this.state.topics[0].nouns.length-1 - 0 + 1)) + 0;

        this.setState({
            text: this.state.topics[0].nouns[i]
        });
    },

    removeTopic: function() {
        var topic = document.getElementById("topic").innerHTML;

        if (topic=="")
            return;

        var confirm = window.confirm("Are you sure you want to remove " + topic + "?");

        if (confirm) {
            for (var i=0; i<this.state.topics[0].nouns.length; i++) {
                if (this.state.topics[0].nouns[i]==topic)
                    this.state.topics[0].nouns.splice(i, 1);
            }
            this.refreshTopics();
        }
    },

    addTopic: function() {
        var newTopic = document.getElementById("newTopic").value;

        var dontAdd = false;
        for (var i=0; i<this.state.topics[0].nouns.length; i++) {
            if (this.state.topics[0].nouns[i].toLowerCase()==newTopic.toLowerCase())
                dontAdd = true;
        }

        if (newTopic!=="" && !dontAdd) {
            this.state.topics[0].nouns.push(newTopic);

            /* sort */
            this.state.topics[0].nouns.sort(function(a, b){
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            });

            this.refreshTopics();

            document.getElementById("newTopic").value = "";
        }
    },

    refreshTopics: function () {
        $.post("write.php", {json : JSON.stringify(this.state.topics)});
    },

    render: function() {
        return (
            <div>
            <input 
            type="button"
            value="Generate"
            onClick={this.generate}
            />
            <h4 id="topic">{this.state.text}</h4>
            <input 
            type="button"
            value="Remove this word from the list"
            onClick={this.removeTopic}
            /><br/>
            <input 
            type="button"
            value="Add"
            onClick={this.addTopic}
            />
            <input 
            type="text"
            id="newTopic"
            />
            </div>);
    }
});



$.getJSON("topics.json", function() {

}).success(function(data) {
    var topics = data;

    ReactDOM.render(
        <MainView topics={topics}/>,
        document.getElementById("container")
        );

}).error(function(jqXHR, textStatus, errorThrown) {
    console.log("error " + textStatus);
    console.log("incoming Text " + jqXHR.responseText);
});