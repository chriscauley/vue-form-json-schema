import { VFJS_EVENT_UI_FIELDS_UPDATE } from '../../constants';

const helpers = {
  vfjsFieldHelperAddListener(el, event) {
    el.addEventListener(event, this.vfjsFieldHelperStateEventHandler);
  },
  vfjsFieldHelperRemoveListener(el, event) {
    el.removeEventListener(event, this.vfjsFieldHelperStateEventHandler);
  },
  vfjsFieldHelperStateEventHandler(event) {
    if (event && event.type === 'blur') {
      const initialBlur = this.vfjsFieldState.vfjsFieldBlur;
      this.setVfjsFieldState({
        ...this.vfjsFieldState,
        vfjsFieldBlur: true,
      });

      if (!initialBlur) {
        this.vfjsBus.$emit(VFJS_EVENT_UI_FIELDS_UPDATE);
      }
    }
  },
  vfjsFieldHelperFormatEvents(events) {
    if (!events) {
      return {};
    }

    let eventsObj = events;

    if (Array.isArray(events)) {
      eventsObj = events.reduce(
        (obj, event) => ({ ...obj, [event]: true }),
        {},
      );
    } else if (typeof events === 'string') {
      eventsObj = { [events]: true };
    }

    return this.vfjsFieldHelperFormatEventsReducer(eventsObj);
  },
  vfjsFieldHelperFormatClasses(classes) {
    if (!classes) {
      return {};
    }

    if (typeof classes === 'string') {
      return {
        [classes]: true,
      };
    }

    if (Array.isArray(classes)) {
      return classes.reduce(
        (classesObj, key) => ({
          ...classesObj,
          [key]: true,
        }),
        {},
      );
    }

    if (typeof classes === 'string') {
      if (classes.indexOf(',') !== -1) {
        return classes.split(',');
      }

      if (classes.indexOf(' ') !== -1) {
        return classes.split(' ');
      }
    }

    return classes;
  },
  vfjsFieldHelperEventHandler(key, cb) {
    return (...args) => {
      if (typeof cb === 'function') {
        return this.setVfjsFieldModel(cb(...args));
      }

      if (args[0] instanceof Event) {
        if (
          args[0].target &&
          typeof args[0].target[this.vfjsFieldEventProp] !== 'undefined'
        ) {
          return this.setVfjsFieldModel(
            args[0].target[this.vfjsFieldEventProp],
          );
        }

        return this.setVfjsFieldModel(undefined);
      }

      return this.setVfjsFieldModel(args[0]);
    };
  },
  vfjsFieldHelperFormatEventsReducer(events = {}) {
    return Object.keys(events).reduce((formattedEvents, key) => {
      const rest = key.substring(1);
      const firstLetter = key[0].toUpperCase();
      const property = `on${firstLetter}${rest}`;

      return {
        ...formattedEvents,
        [property]: this.vfjsFieldHelperEventHandler(key, events[key]),
      };
    }, {});
  },
  vfjsFieldHelperComponentMatchesComponentProperties(componentProperties) {
    return componentProperties.some((componentProperty) => {
      if (typeof componentProperty === 'string') {
        return this.vfjsComponent === componentProperty;
      }

      if (typeof componentProperty === 'object') {
        const { component, ...properties } = componentProperty;

        if (this.vfjsComponent === component) {
          return Object.keys(properties).every((property) => {
            if (property in this.vfjsFieldOptions) {
              const keys = properties[property];

              return Object.keys(keys).every(
                (key) => this.vfjsFieldOptions[property][key] === keys[key],
              );
            }

            return false;
          });
        }
      }

      return false;
    });
  },
  vfjsFieldHelperAttrsChecked() {
    const { checked = [] } = this.vfjsOptions.componentProperties.attrs;
    if (this.vfjsFieldHelperComponentMatchesComponentProperties(checked)) {
      if (this.vfjsFieldModel === this.vfjsFieldOptions.attrs.value) {
        return true;
      }

      return this.vfjsFieldOptions.attrs && this.vfjsFieldOptions.attrs.checked;
    }

    return undefined;
  },
  vfjsFieldHelperAttrsRequired() {
    const { required = [] } = this.vfjsOptions.componentProperties.attrs;

    if (this.vfjsFieldHelperComponentMatchesComponentProperties(required)) {
      return this.vfjsFieldRequired;
    }

    return undefined;
  },
  vfjsFieldHelperAttrsValue() {
    const { value = [] } = this.vfjsOptions.componentProperties.attrs;
    if (this.vfjsFieldHelperComponentMatchesComponentProperties(value)) {
      if (this.vfjsFieldModel) {
        return this.vfjsFieldModel;
      }

      return this.vfjsFieldOptions.attrs && this.vfjsFieldOptions.attrs.value;
    }

    return undefined;
  },
  vfjsFieldHelperDomPropsInnerHTML() {
    const { innerHTML = [] } = this.vfjsOptions.componentProperties.domProps;

    if (this.vfjsFieldHelperComponentMatchesComponentProperties(innerHTML)) {
      if (this.vfjsFieldModel) {
        return this.vfjsFieldModel;
      }

      return (
        this.vfjsFieldOptions.domProps &&
        this.vfjsFieldOptions.domProps.innerHTML
      );
    }

    return undefined;
  },
  vfjsFieldHelperDomPropsValue() {
    const { value = [] } = this.vfjsOptions.componentProperties.domProps;
    if (this.vfjsFieldHelperComponentMatchesComponentProperties(value)) {
      if (this.vfjsFieldModel) {
        return this.vfjsFieldModel;
      }

      return (
        this.vfjsFieldOptions.domProps && this.vfjsFieldOptions.domProps.value
      );
    }

    return undefined;
  },
  vfjsFieldHelperDomPropsChecked() {
    const { checked = [] } = this.vfjsOptions.componentProperties.domProps;
    if (this.vfjsFieldHelperComponentMatchesComponentProperties(checked)) {
      if (this.vfjsFieldModel === this.vfjsFieldOptions.domProps.value) {
        return true;
      }

      return (
        this.vfjsFieldOptions.domProps && this.vfjsFieldOptions.domProps.checked
      );
    }

    return undefined;
  },
  vfjsFieldHelperPropsRequired() {
    const { required = [] } = this.vfjsOptions.componentProperties;
    if (this.vfjsFieldHelperComponentMatchesComponentProperties(required)) {
      return this.vfjsFieldRequired;
    }

    return undefined;
  },
};

export default helpers;
