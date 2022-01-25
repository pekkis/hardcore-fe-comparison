// stores/counter.js
import { defineStore } from "pinia";
import { DuckProspectType, DuckType } from "../services/duck";
import duckService from "../services/duck";

type DuckStoreType = {
  ducks: Record<string, DuckType>;
  numberOfOperations: number;
  isInitialized: boolean;
  duckIsBeingHired: boolean;
};

export const useDuckStore = defineStore("duck", {
  state: (): DuckStoreType => {
    return {
      ducks: {},
      numberOfOperations: 0,
      isInitialized: false,
      duckIsBeingHired: false
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async fireDuck(id: string) {
      this.ducks[id].isBeingFired = true;
      this.numberOfOperations = this.numberOfOperations + 1;
      await duckService.fireDuck(id);
      this.numberOfOperations = this.numberOfOperations - 1;
      delete this.ducks[id];
    },

    async hireDuck(prospect: DuckProspectType) {
      this.duckIsBeingHired = true;
      this.numberOfOperations = this.numberOfOperations + 1;

      const duck = await duckService.hireDuck(prospect);

      this.duckIsBeingHired = false;
      this.ducks[duck.id] = duck;
      this.numberOfOperations = this.numberOfOperations - 1;
    },
    async getDucks() {
      this.numberOfOperations = this.numberOfOperations + 1;
      const ret = await duckService.getDucks();
      this.numberOfOperations = this.numberOfOperations - 1;
      this.ducks = Object.fromEntries(ret.map((d) => [d.id, d]));
      this.isInitialized = true;
    }
  }
});
