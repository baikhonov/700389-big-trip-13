import dayjs from "dayjs";
import SmartView from "./smart";
import {EVENT_TYPES} from "../const";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


const createStatisticsTemplate = () => {
  return `
    <section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>
  `;
};

export default class Statistics extends SmartView {
  constructor(events) {
    super();

    this._data = {
      events
    };

    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  _getTypeEvents(events, eventType) {
    return events.filter((event) => {
      return event.type === eventType;
    });
  }

  _renderMoneyChart(moneyCtx, events) {
    const getEventsTypePrice = (eventType) => {
      let eventTypeFullPrice = 0;
      for (const event of this._getTypeEvents(events, eventType)) {
        eventTypeFullPrice += event.price;
      }
      return eventTypeFullPrice;
    };

    const getAllPrices = function (types) {
      let outputPrices = [];
      types.forEach((type) => {
        outputPrices.push(getEventsTypePrice(type));
      });

      return outputPrices;
    };

    return new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: EVENT_TYPES,
        datasets: [{
          data: getAllPrices(EVENT_TYPES),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  };

  _renderTypeChart(typeCtx, events) {
    const getEventsTypeRepeat = (eventsType) => {
      return this._getTypeEvents(events, eventsType).length;
    };

    const getAllTypesRepeat = function (types) {
      let outputRepeats = [];
      types.forEach((type) => {
        outputRepeats.push(getEventsTypeRepeat(type));
      });

      return outputRepeats;
    };

    return new Chart(typeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: EVENT_TYPES,
        datasets: [{
          data: getAllTypesRepeat(EVENT_TYPES),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TYPE`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  };

  _renderTimeSpendChart(timeCtx, events) {
    const getEventsTypeTime = (eventType) => {
      const diffTime = [];
      const modules = {
        hour: 24,
      };
      let diffTimeHour = 0;
      for (const event of this._getTypeEvents(events, eventType)) {
        diffTimeHour += dayjs(event.endDate).diff(dayjs(event.beginDate), `h`);
      }
      let diffTimeDay = Math.floor(diffTimeHour / modules.hour);

      if (diffTimeDay !== 0) {
        diffTime.push(diffTimeDay);
      }
      return Number(diffTime.join(` `));
    };

    const getAllTimes = function (types) {
      let outputTimes = [];
      types.forEach((type) => {
        outputTimes.push(getEventsTypeTime(type));
      });

      return outputTimes;
    };

    return new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: EVENT_TYPES,
        datasets: [{
          data: getAllTimes(EVENT_TYPES),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}D`
          }
        },
        title: {
          display: true,
          text: `TIME-SPEND`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  };

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    const {events} = this._data;
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);
    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 8;
    typeCtx.height = BAR_HEIGHT * 8;
    timeSpendCtx.height = BAR_HEIGHT * 8;


    this._moneyChart = this._renderMoneyChart(moneyCtx, events);
    this._typeChart = this._renderTypeChart(typeCtx, events);
    this._timeSpendChart = this._renderTimeSpendChart(timeSpendCtx, events);
  }
}

