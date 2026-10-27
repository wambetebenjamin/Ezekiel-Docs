export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-10 w-10 rounded-full border-[3px] border-border border-t-primary animate-spin"
        aria-hidden="true"
      />
      <p className="font-body text-sm text-text-secondary">
        Loading Ezekiel Docs...
      </p>
    </div>
  )
}
