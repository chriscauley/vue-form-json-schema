import { merge, set } from 'lodash';

const methods = {
  vfsFieldGetAttributes(options, defaultOptions) {
    const classFormatted = merge(
      {},
      this.vfsFieldFormatClasses(options.class),
      this.vfsFieldFormatClasses(defaultOptions.class),
    );

    return merge({}, defaultOptions, options, classFormatted);
  },
  vfsFieldFormatClasses(classes) {
    if (!classes) {
      return {};
    }

    return Array.isArray(classes)
      ? classes.reduce((classesObj, key) => ({
        ...classes,
        [key]: true,
      }), {})
      : classes;
  },
  vfsFieldEventHandler(key, cb) {
    return (data) => {
      if (typeof cb === 'function') {
        return this.setVfsFieldModel(cb(data));
      }

      if (data instanceof Event && data.target && data.target.value) {
        return this.setVfsFieldModel(data.target.value);
      }

      return this.setVfsFieldModel(data);
    };
  },
  vfsFieldFormatEventsReducer(events) {
    return events.reduce((formattedEvents, key) => (
      set(
        Object.assign({}, formattedEvents),
        this.vfsFieldFormatEventListenerKey(key),
        this.vfsFieldEventHandler(key, this.events[key]),
      )
    ), {});
  },
  vfsFieldFormatEvents(events) {
    return Array.isArray(this.events)
      ? this.vfsFieldFormatEventsReducer(this.events)
      : this.vfsFieldFormatEventsReducer(Object.keys(this.events));
  },
  vfsFieldFormatEventListenerKey(key) {
    const keyPrefix = this.prefixes.find(prefix => key.match(prefix));
    if (!keyPrefix) {
      return key;
    }

    const strippedPrefixKey = String(key)
      .replace(keyPrefix, '')
      .toLowerCase();

    return `${keyPrefix}.${strippedPrefixKey}`;
  },
};

export default methods;
