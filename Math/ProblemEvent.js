class ProblemEvent {
  constructor(event, problemInst) {
    this.event = event;
    this.problemInst = problemInst;
  }
  textMessage(resolve) {
    
    const text = this.event.text
    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      }
    })
    message.init( this.problemInst.element )
  }
  init(resolve) {
    this[this.event.type](resolve);
  }
}