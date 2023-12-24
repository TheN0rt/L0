export class View {
  constructor(template) {
    this.view = {};
    const elements = template.content.querySelectorAll('[data-tag]');
    elements.forEach((element) => {
      this.view[element.dataset.tag] = element;
    });
  }

  getView(){
    return this.view
  }
}
 