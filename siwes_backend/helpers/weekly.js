class weekly {
  constructor(progress, logbook_id, weekly_tract) {
    (this.progress = progress),
      (this.logbook_id = logbook_id),
      (this.weekly_tract = weekly_tract);
  }
  Values() {
    return {
      progress: this.progress,
      logbook_id: this.logbook_id,
      weekly_tract: this.weekly_tract,
    };
  }
}

module.exports = weekly;
