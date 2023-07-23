"use client";

import { useAppStore } from "@/stores/AppStore";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

export default function Home() {
  const currentValue = useAppStore((state) => state.currentValue);
  const nextValue = useAppStore((state) => state.nextValue);
  const probability = useAppStore((state) => state.currentProbability);
  const upgradable = useAppStore((state) => state.upgradable);
  const destroyed = useAppStore((state) => state.destroyed);
  const couponImagePath = useAppStore((state) => state.couponImagePath);
  const { upgrade, reset } = useAppStore((state) => ({
    upgrade: state.upgrade,
    reset: state.reset,
  }));

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-4xl mb-12">{"Coupon Upgrade"}</h1>

      <div className="min-h-[8rem] relative w-full flex items-center justify-center">
        <img className="absolute w-1/2" src={couponImagePath} alt="" />
        <p
          hidden={destroyed}
          className="font-extrabold text-3xl mr-16"
        >{`₩${currentValue}`}</p>
      </div>
      <button
        className={`${
          destroyed ? "bg-slate-200" : "bg-white"
        } px-2 py-1 rounded-md outline font-bold select-none`}
        onClick={upgrade}
        disabled={!upgradable || destroyed}
      >
        {!upgradable ? "MAX Reached" : destroyed ? "Destroyed..." : "Upgrade!"}
      </button>
      <div className="w-1/4 flex flex-col items-center">
        <span className="font-bold flex w-full items-center justify-between">
          <p>Next Value:</p>
          <p>₩{nextValue}</p>
        </span>
        <span className="font-bold flex w-full items-center justify-between">
          <p>Probability:</p>
          <p>{probability}%</p>
        </span>
      </div>
      <button
        disabled={!destroyed}
        className={`${
          !destroyed ? "bg-slate-200" : "bg-white"
        } px-2 py-1 rounded-md outline font-bold ${
          !destroyed ? "text-slate-400" : "text-black"
        } select-none`}
        onClick={reset}
      >
        Reset
      </button>
    </main>
  );
}
