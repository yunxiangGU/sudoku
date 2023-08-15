import React, { useEffect, useState } from "react";
import SlCarouselItem from "@shoelace-style/shoelace/dist/react/carousel-item";
import SlButton from "@shoelace-style/shoelace/dist/react/button";
import { Cell, Sudoku } from "./page";

export default function Sudoku(props: { id: number; sudoku: Sudoku }) {
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);
  const [sudoku, setSudoku] = useState<Sudoku>(props.sudoku);

  function handleCellClick(index: number) {
    setSelectedCellIndex(index);
  }

  function handlePopulateCell(value: number) {
    if (selectedCellIndex > 0) {
      let updatedSudoku = sudoku.map((cell: Cell, index: number) => {
        return index === selectedCellIndex
          ? { value: value.toString(), fixed: cell.fixed }
          : cell;
      });
      setSudoku(updatedSudoku);
    }
  }

  function getRowIndices(index: number) {
    return Array.from({ length: 9 }, (_x, i) => i + Math.floor(index / 9) * 9);
  }

  function getColumnIndices(index: number) {
    let res = [];
    let currIndex = index;
    while (currIndex >= 0) {
      res.push(currIndex);
      currIndex -= 9;
    }
    currIndex = index;
    while (currIndex <= 80) {
      res.push(currIndex);
      currIndex += 9;
    }
    return res;
  }

  function getSameSectionIndices(index: number) {
    let res = [];
    let sectionColStart = Math.floor((index % 9) / 3) * 3;
    let sectionRowStart = Math.floor(Math.floor(index / 9) / 3) * 3;

    for (let i = sectionRowStart; i < sectionRowStart + 3; i++) {
      for (let j = sectionColStart; j < sectionColStart + 3; j++) {
        res.push(i * 9 + j);
      }
    }
    return res;
  }

  function getForbiddenNumbers(index: number) {
    let res = new Set();
    getRowIndices(index).forEach((index: number) => {
      if (sudoku[index].value) {
        res.add(sudoku[index].value);
      }
    });
    getColumnIndices(index).forEach((index: number) => {
      if (sudoku[index].value) {
        res.add(sudoku[index].value);
      }
    });
    getSameSectionIndices(index).forEach((index: number) => {
      if (sudoku[index].value) {
        res.add(sudoku[index].value);
      }
    });
    return res;
  }

  return (
    <SlCarouselItem>
      <div className="text-2xl font-bold p-10">{`Sudoku ${props.id + 1}`}</div>
      <div className="grid grid-cols-9 w-fit">
        {sudoku.map((cell: Cell, index: number) => {
          return (
            <button
              key={index}
              disabled={cell.fixed}
              className={`border w-9 h-9 
                ${index === selectedCellIndex && "bg-blue-200"} 
                ${cell.fixed && "bg-gray-300"}
                ${Math.floor(index / 9) % 3 == 0 && "border-t-black"}
                ${Math.floor(index / 9) == 8 && "border-b-black"}
                ${Math.floor(index % 3) == 0 && "border-l-black"}
                ${Math.floor(index % 9) == 8 && "border-r-black"}
              `}
              onClick={() => handleCellClick(index)}
            >
              {cell.value}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 p-2">
        {Array.from(Array(9).keys()).map((number: number, id: number) => {
          return (
            <SlButton
              key={id}
              className="w-9 h-9"
              disabled={
                selectedCellIndex < 0 ||
                getForbiddenNumbers(selectedCellIndex).has(
                  (number + 1).toString()
                )
              }
              onClick={() => handlePopulateCell(number + 1)}
            >
              {number + 1}
            </SlButton>
          );
        })}
      </div>
    </SlCarouselItem>
  );
}
