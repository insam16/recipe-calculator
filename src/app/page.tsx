"use client"

import { isValidElement, useState } from "react"
import { calculate, isFood } from "@/lib/recipeCalculator"
import { recipes, ItemName } from "@/data/recipes"
import Image from "next/image"

export default function Home() {
  const [item, setItem] = useState<ItemName>("천상의 디저트 파티")
  const [value, setValue] = useState("1")
  const [result, setResult] = useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const num = Number(value || 0)
  const isValid = value === "" || (!isNaN(num) && num > 0)

  const buttonStyle = "border-gray-100 border-2 rounded-lg p-1 bg-gray-100"
  const buttonSelectedStyle = "border-yellow-400 border-2 rounded-lg p-1 bg-yellow-300"

  const items = [
    {
      name: "천상의 디저트 파티",
      src: "/image/heavenly-dessert-party.png"
    },
    {
      name: "하모니 푸딩",
      src: "/image/harmony-pudding.png"
    },
    {
      name: "허니허니 와플",
      src: "/image/honey-honey-waffle.png"
    },
    {
      name: "달콤동동 화채",
      src: "/image/sweet-fruit-bowl.png"
    }
  ]

  const handleCalculate = () => {
    const res = calculate(item, num)
    setResult(res)
  }

  return (
    <div className="p-8 w-[430px] mx-auto">
      <h1 className="text-2x1 font-bold mb-4">🍰 길드 음식 계산기</h1>
      <div className="flex gap-2 mb-4">
        {items.map((item) => (
          <button
            className={selectedItem === item.name ? buttonSelectedStyle : buttonStyle}
            onClick={() => {
              setItem(item.name);
              setResult(null);
              setSelectedItem(item.name);
            }}
          >
            <Image
              src={item.src}
              alt={item.name}
              width={60}
              height={60}
            />
          </button>
        ))}
      </div>

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
            value={item}
            onChange={(e) => {
              setItem(e.target.value as ItemName);
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
              <li key={item}>
                {item}: {num}
              </li>
            </ul>

            {!isFood(item) && (
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