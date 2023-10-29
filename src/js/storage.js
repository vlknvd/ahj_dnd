export default class Storage {
  constructor() {
    this.storage = localStorage;
  }

  save(data) {
    this.storage.setItem('dataTask', JSON.stringify(data));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('dataTask'));
    } catch (e) {
      throw new Error('Invalid data');
    }
  }

  remove() {
    let data = this.load();
    data = {};
    this.save(data);
  }
}
