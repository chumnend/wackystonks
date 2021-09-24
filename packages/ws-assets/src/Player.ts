export interface PlayerProps {
  /** An identifier used to represent a player */
  id: string;
  /** Name of a player */
  name: string;
}

class Player implements PlayerProps {
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}

export default Player;
