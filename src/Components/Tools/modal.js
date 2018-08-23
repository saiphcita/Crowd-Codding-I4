import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div style={{display: "inline"}}>
        <button onClick={this.toggle} className={this.props.styleB}>Show More</button>
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 350 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Post Number {this.props.ind}</ModalHeader>
          <ModalBody>
              {this.props.post}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Go Back</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;