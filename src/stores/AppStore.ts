import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const probabilityTable = [
  [50, 90],
  [100, 80],
  [150, 70],
  [200, 60],
  [300, 50],
  [500, 40],
  [1000, 30],
  [2500, 20],
  [5000, 10],
];

const coupontImagePaths = ["res/coupon.svg", "res/coupon_fail.svg"];

type State = {
  upgradable: boolean;
  destroyed: boolean;
  maxUpgrade: number;
  currentValue: number;
  currentStage: number;
  nextValue: number;
  currentProbability: number;
  couponImagePath: string;
};

type Actions = {
  upgrade: () => void;
  reset: () => void;
};

export const useAppStore = create(
  immer<State & Actions>((set, get) => ({
    currentValue: 10,
    destroyed: false,
    currentStage: 0,
    couponImagePath: coupontImagePaths[0],
    maxUpgrade: probabilityTable.length,
    upgradable: true,
    nextValue: probabilityTable[0][0],
    currentProbability: probabilityTable[0][1],
    upgrade: () => {
      const outValue = Math.floor(Math.random() * 101);
      if (outValue <= get().currentProbability) {
        set((state) => {
          const nextStage = state.currentStage + 1;
          state.currentStage = nextStage;
          state.currentProbability = probabilityTable[nextStage][1];
          state.currentValue = state.nextValue;
          state.nextValue = probabilityTable[nextStage][0];
          state.upgradable = state.maxUpgrade - 1 !== nextStage;
        });
      } else {
        set((state) => {
          state.couponImagePath = coupontImagePaths[1];
          state.destroyed = true;
        });
      }
    },
    reset: () =>
      set((state) => {
        state.currentStage = 0;
        state.currentProbability = probabilityTable[0][1];
        state.currentValue = 10;
        state.upgradable = true;
        state.nextValue = probabilityTable[0][0];
        state.destroyed = false;
        state.couponImagePath = coupontImagePaths[0];
      }),
  }))
);
