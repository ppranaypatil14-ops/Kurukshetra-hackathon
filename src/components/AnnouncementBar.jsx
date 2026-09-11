import React from 'react'

export default function AnnouncementBar() {
  return (
    <aside className="w-full bg-gradient-to-r from-[#590e75] via-[#4d0c69] to-[#3f0957] px-4 py-2.5 text-xs sm:text-sm font-medium border-b border-purple-900/40">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white tracking-wide">DeepScan</span>
          <span className="text-purple-100">— Software Supply Chain Security</span>
        </div>
        <a className="group inline-flex items-center gap-1 text-white hover:text-purple-200 transition-colors font-semibold" href="#learn-more">
          <span>Learn more</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </aside>
  )
}
