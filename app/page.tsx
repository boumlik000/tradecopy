"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Check, Copy } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const cardColors = [
  "#E74C3C", // Red
  "#3498DB", // Blue
  "#D4AF37", // Gold
  "#2ECC71", // Green
  "#9B59B6", // Purple
  "#F39C12", // Orange
  "#1ABC9C", // Teal
  "#E91E63", // Pink
  "#00BCD4", // Cyan
  "#8BC34A", // Light Green
  "#FF5722", // Deep Orange
]

const initialCards = [
  { id: 1, title: "DAY 240", subtitle: "" },
  { id: 2, title: "EURUSD REVIEW", subtitle: "" },
  { id: 3, title: "x", subtitle: "" },
  { id: 4, title: "-1%", subtitle: "" },
  { id: 5, title: "+0%", subtitle: "" },
  { id: 6, title: "NO TRADE", subtitle: "(02:00 - 05:00)" },
  { id: 7, title: "EURUSD REVIEW", subtitle: "" },
  { id: 8, title: "EURUSD FORCAST", subtitle: "" },
  { id: 9, title: "EURUSD WEEKLY REVIEW", subtitle: "(01/12 - 05/12)" },
  { id: 10, title: "EURUSD WEEKLY FORCAST", subtitle: "(08/12 - 12/12)" },
  { id: 11, title: "LDN KZ REVIEW", subtitle: "" },
]

function BookmarkIcon({ color, isWhite }: { color: string; isWhite: boolean }) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M2 4C2 2.89543 2.89543 2 4 2H16C17.1046 2 18 2.89543 18 4V21L10 17L2 21V4Z"
        fill={isWhite ? "#FFFFFF" : color}
        stroke={isWhite ? "#FFFFFF" : color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SampherosisPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [percentage, setPercentage] = useState<string>("0")
  const [cards, setCards] = useState(initialCards)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleCopyCard = async (id: number, title: string, subtitle: string) => {
    try {
      const fullText = subtitle ? `${title}\n${subtitle}` : title
      await navigator.clipboard.writeText(fullText)
      setCopiedId(id)
      setShowToast(true)
      setTimeout(() => {
        setCopiedId(null)
        setShowToast(false)
      }, 1500)
    } catch () {
      console.error("Failed to copy text")
    }
  }

  const handleApplyPercentage = () => {
    const sign = Number(percentage) >= 0 ? "+" : ""
    setCards((prev) =>
      prev.map((card, index) => {
        if (index === 2) {
          return { ...card, title: `${sign}${percentage}%` }
        }
        return card
      }),
    )
  }

  const handleApplyDate = () => {
    if (date) {
      const formattedDate = format(date, "EEEE dd MMMM yyyy").toUpperCase()
      setCards((prev) =>
        prev.map((card, index) => {
          // Cards 6, 9, 10 keep their special subtitles
          if (index === 5 || index === 8 || index === 9) {
            return card
          }
          return { ...card, subtitle: formattedDate }
        }),
      )
    }
  }

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url('./img2.png')",
          backgroundPosition:"center",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Logo - Smaller on mobile */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
          <img src="./Group2.svg" alt="logo" style={{height:60}}/>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-full px-4 py-4 sm:px-6 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 sm:mb-8">
          {/* Percentage Input */}
          <div className="flex items-center gap-2 justify-between sm:justify-start">
            <span className="text-sm font-medium text-[#1a1a1a] whitespace-nowrap">Enter %:</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-16 sm:w-20 border-0 bg-[#f5f5f5] rounded-lg text-center font-semibold text-[#1a1a1a]"
              />
              <Button
                onClick={handleApplyPercentage}
                className="bg-[#1a1a1a] hover:bg-[#333] text-white font-semibold rounded-lg px-3 sm:px-4 text-sm"
              >
                Set %
              </Button>
            </div>
          </div>

          <div className="w-full h-px sm:w-px sm:h-8 bg-[#ddd]" />

          {/* Date Picker Section */}
          <div className="flex items-center gap-2 flex-1 justify-between sm:justify-start">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal border-0 bg-[#f5f5f5] rounded-lg text-[#1a1a1a] text-xs sm:text-sm flex-1 sm:flex-initial",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{date ? format(date, "PPP") : "Pick a date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 z-50"
                align="center"
                side="bottom"
                sideOffset={8}
                style={{ zIndex: 9999 }}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate)
                    setCalendarOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleApplyDate}
              className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1a1a1a] font-semibold rounded-lg px-3 sm:px-4 text-sm whitespace-nowrap"
            >
              Apply Date
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCopyCard(card.id, card.title, card.subtitle)}
              className={cn(
                "rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm cursor-pointer transition-all duration-200",
                "hover:shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98]",
                copiedId === card.id ? "bg-[#D4AF37] ring-2 ring-[#B8962E] scale-[1.02]" : "bg-white",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <BookmarkIcon color={cardColors[index]} isWhite={copiedId === card.id} />

                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-bold text-sm leading-relaxed break-words",
                      copiedId === card.id ? "text-[#1a1a1a]" : "text-[#1a1a1a]",
                    )}
                  >
                    {card.title}
                  </p>
                  {card.subtitle && (
                    <p
                      className={cn(
                        "text-xs mt-1 font-medium break-words",
                        copiedId === card.id ? "text-[#1a1a1a]/70" : "text-[#666]",
                      )}
                    >
                      {card.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {copiedId === card.id ? (
                    <Check className="h-4 w-4 text-[#1a1a1a]" />
                  ) : (
                    <Copy className="h-4 w-4 text-[#999]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1a1a1a] px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 max-w-[90vw]",
            showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          )}
        >
          <Check className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Text copied successfully</span>
        </div>

        <div className="mt-40 flex justify-center">
          <img src="./span.svg" alt="logo" style={{height:20}}/>
        </div>
      </div>
    </div>
  )
}
