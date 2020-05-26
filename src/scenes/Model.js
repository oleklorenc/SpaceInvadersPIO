export default class Model {
    constructor() {
      this._soundOn = true;
      this._musicOn = true;
      this._diff=0
      this._vol=0
    }
   
    //Muzyka
    set musicOn(value) {
      this._musicOn = value;
    }
   
    get musicOn() {
      return this._musicOn;
    }
   
    //Dzwieki
    set soundOn(value) {
      this._soundOn = value;
    }
   
    get soundOn() {
      return this._soundOn;
    }

    //Poziom trudnosci
    set diff(value) {
      this._diff = value;
    }
   
    get diff() {
      return this._diff
    }

    //Glosnosc
    set vol(value) {
      this._vol = value;
    }
   
    get vol() {
      return this._vol
    }
  }