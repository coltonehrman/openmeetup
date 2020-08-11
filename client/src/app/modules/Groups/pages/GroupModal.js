import React from 'react';
import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { Input } from '../../../../_metronic/_partials/controls';
import * as actions from '../_redux/groupsActions'

const GroupDialogHeader = ({ id, title }) => {
  return (
    <Modal.Header>
      <Modal.Title id="edit-group-modal-sizes-title-lg">{title}</Modal.Title>
    </Modal.Header>
  );
};

const GroupForm = ({ dispatch, onHide }) => {
  const initGroup = {
    id: null,
    title: '',
    description: '',
    longitude: '',
    latitude: ''
  };

  // Validation schema
  const GroupEditSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Minimum 5 characters")
      .max(50, "Maximum 50 characters")
      .required(true),
    description: Yup.string()
      .min(5, "Minimum 5 characters")
      .max(250, "Maximum 250 characters"),
    longitude: Yup.number()
      .moreThan(-181)
      .lessThan(181),
    latitude: Yup.number()
      .moreThan(-91)
      .lessThan(91)
  });

  return (
    <Formik
      initialValues={initGroup}
      enableReinitialize={true}
      validationSchema={GroupEditSchema}
      onSubmit={values => {
        dispatch(actions.createGroup(values));
        onHide();
      }}
    >
      {({ handleSubmit }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {false && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            <Form className="form form-label-right">
              {/* Title */}
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="title"
                    component={Input}
                    placeholder="Title"
                    label="Title"
                  />
                </div>
              </div>
              {/* Description */}
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="description"
                    component={Input}
                    placeholder="Description"
                    label="Description"
                  />
                </div>
              </div>
              {/* Location */}
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    type="number"
                    name="longitude"
                    component={Input}
                    placeholder="Longitude"
                    label="Longitude"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    type="number"
                    name="latitude"
                    component={Input}
                    placeholder="Latitude"
                    label="Latitude"
                  />
                </div>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              onClick={onHide}
              className="btn btn-light btn-elevate"
            >
              Cancel
            </button>
            <> </>
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="btn btn-primary btn-elevate"
            >
              Submit
            </button>
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
};

const GroupModal = ({ id, show, onHide }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="edit-group-modal-sizes-title-lg"
    >
      <GroupDialogHeader id={id} title="Group" />
      <GroupForm dispatch={dispatch} onHide={onHide} />
    </Modal>
  );
};

export default GroupModal;
