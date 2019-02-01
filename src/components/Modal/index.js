import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import './style.sass';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  
  render() {
    const { open, toggle, children, issueForm, handleSubmit, handleFormSubmit, pristine, submitting, home:{
      isLoading
    } } = this.props;
    return (
      <div className="container-fluid">
        <Modal isOpen={open && open} toggle={toggle} className='support-fields-modal'>
          <ModalHeader toggle={toggle}>{issueForm ? 'Create Issue' : 'Post a comment'}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            {
              <Button type="submit" color="success" onClick={handleSubmit(handleFormSubmit)} disabled={submitting || pristine || isLoading }>
                {isLoading ? 'Please wait' : issueForm ? 'Create Issue' : 'Post'}
              </Button>
            }
            <Button color="danger" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;