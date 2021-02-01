import {FilterType} from "../const";
import {isEventInPast, isEventInFuture} from "./event";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventInFuture(event.beginDate)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventInPast(event.endDate))
};
