"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ProjectImage {
  src: string
  caption: string
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  images: ProjectImage[]
  initialIndex: number
  projectTitle: string
}

export function ProjectModal({ isOpen, onClose, images, initialIndex, projectTitle }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const handleClose = () => {
    setCurrentIndex(0)
    onClose()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("keydown", handleArrowKeys)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("keydown", handleArrowKeys)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, currentIndex])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-foreground hover:bg-muted"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="relative bg-card rounded-lg overflow-hidden shadow-2xl">
          <img
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={`${projectTitle} - Image ${currentIndex + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain"
          />

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          <div className="p-6 bg-card border-t border-border">
            <p className="text-sm text-muted-foreground">{images[currentIndex].caption}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
