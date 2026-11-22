import { useState } from "react";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string };
export default function AuthField({ label, error, hint, id, type = "text", ...input }: Props) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <div className="group relative">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute left-3.5 top-4 text-slate-500 transition-colors group-focus-within:text-indigo-400">
          {password ? <><rect x="5" y="10" width="14" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></> : type === "email" ? <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></> : <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>}
        </svg>
        <input {...input} id={id} type={password && visible ? "text" : type}
          aria-invalid={!!error} aria-describedby={error ? id + "-error" : hint ? id + "-hint" : undefined}
          className={"h-[50px] w-full rounded-xl border bg-[#111b2b] pl-11 text-base text-slate-100 outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-slate-500 hover:border-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 disabled:cursor-wait disabled:opacity-60 " + (password ? "pr-14 " : "pr-3.5 ") + (error ? "border-red-400/70" : "border-slate-700")} />
        {password && <button type="button" disabled={input.disabled} aria-label={(visible ? "Hide " : "Show ") + label.toLowerCase()} aria-pressed={visible} aria-controls={id} onClick={() => setVisible(value => !value)} className="absolute inset-y-1 right-1 inline-flex w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400 disabled:cursor-wait">
          <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {visible ? <><path d="m3 3 18 18M9.5 5.3A10 10 0 0 1 12 5c5 0 9 7 9 7a20 20 0 0 1-3 3.7M6.2 6.2A20 20 0 0 0 3 12s4 7 9 7a10 10 0 0 0 5-1.5"/><path d="M10 10a3 3 0 0 0 4 4"/></> : <><path d="M3 12s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7Z"/><circle cx="12" cy="12" r="3"/></>}
          </svg>
        </button>}
      </div>
      {error ? <p id={id + "-error"} className="mt-2 text-sm text-red-300">{error}</p> : hint ? <p id={id + "-hint"} className="mt-2 text-xs leading-5 text-slate-400">{hint}</p> : null}
    </div>
  );
}
