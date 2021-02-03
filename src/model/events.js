import Observer from '../utils/observer';

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this.notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this.notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this.notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this.notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedTask = Object.assign(
      {},
      event,
      {
        beginDate: event.date_from !== null ? new Date(event.date_from) : event.date_from, // На клиенте дата хранится как экземпляр Date
        endDate: event.date_to !== null ? new Date(event.date_to) : event.date_to, // На клиенте дата хранится как экземпляр Date
        price: event.base_price,
        isFavorite: event.is_favorite
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.date_from;
    delete adaptedTask.date_to;
    delete adaptedTask.base_price;

    return adaptedTask;
  }

  static adaptToServer(event) {
    const adaptedTask = Object.assign(
      {},
      event,
      {
        'date_from': event.beginDate instanceof Date ? event.beginDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'date_to': event.endDate instanceof Date ? event.endDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'base_price': event.price,
        'is_favorite': event.isFavorite
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.beginDate;
    delete adaptedTask.endDate;
    delete adaptedTask.price;
    delete adaptedTask.isFavorite;

    return adaptedTask;
  }

}
