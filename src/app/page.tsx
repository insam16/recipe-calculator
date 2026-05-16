"use client"

import { useState } from "react"
import { useCalculator, isFood } from "@/features/calculator/hooks/useCalculator"
import { recipes } from "@/features/calculator/constants/recipes"
import { ItemName } from "@/features/calculator/types"
import ItemSelector from "@/features/calculator/components/ItemSelector"

export default function Home() {
  const [value, setValue] = useState<string>("1")
  const [selectedItem, setSelectedItem] = useState<ItemName>("천상의 디저트 파티")

  const { calculate, result, setResult } = useCalculator()

  const num = Number(value || 0)
  const isValid = value === "" || (!isNaN(num) && num > 0)

  const handleCalculate = () => {
    calculate(selectedItem, num)
  }

  return (
    <div className="p-8 w-[430px] mx-auto">
      <h1 className="text-2x1 font-bold mb-4">🍰 천디파 계산기</h1>
      <ItemSelector
        selectedItem={selectedItem}
        onSelect={(item: ItemName) => {
          setResult(null);
          setSelectedItem(item);
        }}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault(); //새로고침 방지
          handleCalculate()
        }}
      >
        <div className="flex flex-row items-center gap-2">
          {/* 아이템 선택 */}
          <select
            className="border p-2 h-10 w-[180px] appearance-none"
            value={selectedItem}
            onChange={(e) => {
              setResult(null);
              setSelectedItem(e.target.value as ItemName);
            }}
          >
            {Object.keys(recipes).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          {/* 개수 입력 */}
          <input
            type="text"
            className="border p-2 h-10 w-[80px]"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setResult(null);
            }}
            placeholder="수량"
          />

          {/* 버튼 */}
          <button
            type="submit"
            disabled={!isValid}
            onClick={handleCalculate}
            className="bg-blue-500 text-white px-4 py-2 rounded w-[100px] disabled:opacity-50"
          >
            계산하기
          </button>
        </div>
      </form>

      {value !== "" && !isValid && (
        <p className="text-red-500 text-sm mb-2">
          ! 1 이상의 정수를 입력해주세요 !
        </p>
      )}

      {/* 결과 */}
      {
        result && (
          <div className="mt-6">
            <h2 className="font-bold">목표</h2>
            <ul>
              <li key={selectedItem}>
                {selectedItem}: {num}
              </li>
            </ul>

            {!isFood(selectedItem) && (
              <>
                <h2 className="font-bold mt-4">필요한 음식 + ED</h2>
                <ul>
                  {Object.entries(result.foods).map(([name, cnt]) => (
                    <li key={name}>
                      {name}: {(cnt as number).toLocaleString()}
                    </li>
                  ))}
                </ul>
                <p>{result.foodsCost.toLocaleString()} ED</p>
              </>
            )}

            <h2 className="font-bold mt-4">필요한 작물 + ED</h2>
            <ul>
              {Object.entries(result.crops).map(([name, cnt]) => (
                <li key={name}>
                  {name}: {(cnt as number).toLocaleString()}
                </li>
              ))}
            </ul>
            <p>{result.cost.toLocaleString()} ED</p>
          </div>
        )
      }
    </div >
  )
}