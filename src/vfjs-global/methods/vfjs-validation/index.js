import Ajv from 'ajv';
import getters from './getters';
import {
  VFJS_EVENT_MODEL_VALIDATE,
} from '../../../constants';

const vfjsValidation = {
  vfjsValidationInitialize() {
    this.ajv = new Ajv();
    // Add additional schemas
    Object.keys(this.schemas).forEach((key) => {
      this.ajv.addSchema(this.schemas[key], key);
    });

    // Check if validation is enabled and set to run on load
    if (this.vfjsOptions.validate && this.vfjsOptions.validateOnLoad) {
      this.vfjsBus.$emit(VFJS_EVENT_MODEL_VALIDATE, { vfjsModel: this.getVfjsModel() });
    }
  },
  ...getters,
};

export default vfjsValidation;
