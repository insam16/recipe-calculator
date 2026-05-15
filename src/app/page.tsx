"use client"

import { isValidElement, useState } from "react"
import { calculate } from "@/lib/recipeCalculator"
import { recipes, ItemName } from "@/data/recipes"

export default function Home() {
  const [item, setItem] = useState<ItemName>("천상의 디저트 파티")
  const [value, setValue] = useState("1")
  const [result, setResult] = useState<any>(null)
  const num = Number(value || 0)
  const isValid = value === "" || (!isNaN(num) && num > 0)

  const handleCalculate = () => {
    const res = calculate(item, num)
    setResult(res)
  }

  return (
    <div className="p-8 w-96 mx-auto">
      <h1 className="text-2x1 font-bold mb-4">🍰 길드 음식 계산기</h1>

      {/* 아이템 선택 */}
      <select
        className="border p-2 w-full mb-2"
        value={item}
        onChange={(e) => setItem(e.target.value as ItemName)}
      >
        {Object.keys(recipes).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <form
        onSubmit={(e) => {
          e.preventDefault(); //새로고침 방지
          handleCalculate()
        }}
      >
        {/* 개수 입력 */}
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={value}
          onChange={(e) => { setValue(e.target.value) }}
          placeholder="제작할 개수를 입력해주세요"
        />

        {value !== "" && !isValid && (
          <p className="text-red-500 text-sm mb-2">
            ! 1 이상의 정수를 입력해주세요 !
          </p>
        )}

        {/* 버튼 */}
        <button
          type="submit"
          disabled={!isValid}
          onClick={handleCalculate}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          계산하기
        </button>
      </form>

      {/* 결과 */}
      {result && (
        <div className="mt-6">
          <h2 className="font-bold">목표</h2>
          <ul>
            <li key={item}>
              {item}: {num}
            </li>
          </ul>

          <h2 className="font-bold mt-4">필요한 작물</h2>
          <ul>
            {Object.entries(result.materials).map(([name, cnt]) => (
              <li key={name}>
                {name}: {(cnt as number).toLocaleString()}
              </li>
            ))}
          </ul>

          <h2 className="font-bold mt-4">총 비용</h2>
          <p>{result.cost.toLocaleString()}ED</p>
        </div>
      )}
    </div>
  )
}