import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const TWEET = "https://twitter.com/intent/tweet?text=";

class RandomProverbs extends Component {
  state = {
    quoteEnglish: "Click the button for new proverb...",
    quoteSerbian: "",
    tweet: "",
    display: false,
    buttonValue: "Serbian equivalent"
  };

  newQuote = () => {
    fetch("https://api.myjson.com/bins/99hyr")
      .then(response => response.json())
      .then(json => {
        var randomNumber = Math.floor(Math.random() * json.quotes.length);
        this.setState({
          quoteEnglish: json.quotes[randomNumber].english,
          quoteSerbian: json.quotes[randomNumber].serbian,
          display: true,
          tweet:
            this.state.buttonValue === "Serbian equivalent"
              ? json.quotes[randomNumber].english
              : json.quotes[randomNumber].serbian
        });
      })
      .catch(error => alert(error.message));
  };

  equivalentButton = () => {
    if (this.state.buttonValue === "Serbian equivalent") {
      this.setState({
        buttonValue: "English equivalent",
        tweet: this.state.quoteSerbian
      });
    } else {
      this.setState({
        buttonValue: "Serbian equivalent",
        tweet: this.state.quoteEnglish
      });
    }
  };

  render() {
    return (
      <div id="quoteButtons">
        <ButtonGroup>
          <div id="mainButtons" className="btn-group btn-group-lg">
            <Button id="new-quote" color="success" onClick={this.newQuote}>
              <FontAwesomeIcon icon={faLightbulb} /> New Proverb
            </Button>{" "}
          </div>
          {this.state.display ? (
            <div className="btn-group btn-group-lg">
              <Button color="secondary" onClick={this.equivalentButton}>
                {this.state.buttonValue}
              </Button>{" "}
              <Button
                color="info"
                href={TWEET + this.state.tweet}
                target="blank"
              >
                <FontAwesomeIcon icon={faTwitter} /> Tweet
              </Button>{" "}
            </div>
          ) : null}
        </ButtonGroup>
        <div className="container-fluid">
          <div id="quoteBox" className="center">
            {!this.state.display ||
            this.state.buttonValue === "Serbian equivalent" ? (
              <p id="text">{this.state.quoteEnglish}</p>
            ) : (
              <p id="text">{this.state.quoteSerbian}</p>
            )}
          </div>
          <div id="author" hidden>
            - Author
          </div>
        </div>
      </div>
    );
  }
}

export default RandomProverbs;
