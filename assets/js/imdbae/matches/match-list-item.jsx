import React from 'react';
import {Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem, Popover, PopoverBody} from "reactstrap";

export class MatchListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showPopover: false};
  }

  toggle() {
    this.setState({showPopover: !this.state.showPopover});
  }

  render() {
    return <div key={this.props.match.id}>
      <div className={'card mt-2'}>
        <Card>
          <CardBody>
            <CardTitle>
              {
                this.props.match.second_user.name
              }
            </CardTitle>
            <CardText>
              Matched on {this.props.match.movies.length} movies!
              <button className={'btn btn-link'} id={'view-movies-button' + this.props.match.second_user_id}
                      onClick={() => this.toggle()}>View</button>
              <Popover placement="bottom" isOpen={this.state.showPopover}
                       target={'view-movies-button' + this.props.match.second_user_id} toggle={() => this.toggle()}>
                <PopoverBody>
                  <ListGroup className={'list-group-flush'}>
                    {
                      this.props.match.movies
                        .map(m => <ListGroupItem key={m.matched_on_movie_id}>{m.matched_on_movie_title}</ListGroupItem>)
                    }
                  </ListGroup>
                </PopoverBody>
              </Popover>
            </CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  }
}
