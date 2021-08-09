class SampleController {
  default() {
    return {
      text: `You've reached ${this.constructor.name} default method`,
    };
  }
}

export = new SampleController();
