import {
  VFJS_EVENT_FIELD_MODEL_UPDATE,
  VFJS_EVENT_FIELD_MODEL_VALIDATE,
  VFJS_EVENT_FIELD_STATE_UPDATE,
  VFJS_EVENT_MODEL_UPDATE,
  VFJS_EVENT_MODEL_UPDATED,
  VFJS_EVENT_MODEL_VALIDATE,
  VFJS_EVENT_STATE_UPDATED,
} from '../constants';

const data = () => ({
  vfjsBus: {},
  vfjsComponents: {},
  vfjsEvents: [
    VFJS_EVENT_FIELD_MODEL_UPDATE,
    VFJS_EVENT_FIELD_MODEL_VALIDATE,
    VFJS_EVENT_FIELD_STATE_UPDATE,
    VFJS_EVENT_MODEL_UPDATE,
    VFJS_EVENT_MODEL_UPDATED,
    VFJS_EVENT_MODEL_VALIDATE,
    VFJS_EVENT_STATE_UPDATED,
  ],
  vfjsFieldsActive: [],
  vfjsListeners: [],
  vfjsModel: {},
  vfjsOptions: {
    allowInvalidModel: true,
    ajvOptions: {
      allErrors: true,
    },
    validate: true,
    validateOnLoad: true,
    validateOnChange: true,
  },
  vfjsSchema: {},
  vfjsState: {},
  vfjsUiSchema: [],
  vfjsValidator: null
});

export default data;
