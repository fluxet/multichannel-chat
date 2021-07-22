import React, {
  useRef, useEffect, useContext,
} from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { ContextWs } from '../../../contextWs';
import { setType } from '../modalTypeSlice';
import { setCurrentChannelId } from '../channelsSlice';

const Add = () => {
  const { t, i18n } = useTranslation();
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const dispatch = useDispatch();

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const fieldSchema = yup.object().shape({
    name: yup.string().required().max(20, t('modals.maxNameLength')),
  });

  return (
    <>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => dispatch(setType('closing'))}>
          <Modal.Title>{t('modals.add.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={fieldSchema}
            onSubmit={(values) => {
              socket.emit('newChannel', {
                name: values.name,
              }, (response) => {
                dispatch(setType('closing'));
                dispatch(setCurrentChannelId({ currentChannelId: response.data.id }));
              });
            }}
          >
            <Form>
              <FormGroup>
                <Field innerRef={inputEl} name="name" autoFocus data-testid="add-channel" className="mb-2 form-control" required />
                <ErrorMessage name="name" component="span" className="error-tooltip"></ErrorMessage>
                <button type="button" onClick={() => dispatch(setType('closing'))} className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
                <button type="submit" className="btn btn-primary">{t('modals.add.submit')}</button>
              </FormGroup>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
};

export default Add;
