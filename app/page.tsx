"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import SlCarousel from "@shoelace-style/shoelace/dist/react/carousel";
import Sudoku from "./Sudoku";
export const dynamic = "force-dynamic";

export type Cell = {
  value: string | null;
  fixed: boolean;
};

export type Sudoku = Cell[];

export default function Index() {
  const isBrowser = typeof window !== "undefined";
  const supabase = createClientComponentClient();
  const [sudokus, setSudokus] = useState<Cell[][]>([]);

  const getSudokus = async () => {
    const { data: data } = await supabase.from("sudoku_puzzles").select();
    if (data) {
      setSudokus(
        data.map((data) => {
          return (
            data.puzzle.split("").map((cell: string) => {
              return {
                value: cell === "." ? null : cell,
                fixed: cell !== ".",
              };
            }) ?? []
          );
        })
      );
    }
  };

  useEffect(() => {
    getSudokus();
  }, [supabase]);

  return (
    <>
      {sudokus && sudokus.length > 0 && (
        <SlCarousel loop pagination navigation mouse-dragging className="h-fit">
          {sudokus.map((sudoku: Cell[], id: number) => {
            return <Sudoku key={id} id={id} sudoku={sudoku} />;
          })}
        </SlCarousel>
      )}
    </>
  );
}
