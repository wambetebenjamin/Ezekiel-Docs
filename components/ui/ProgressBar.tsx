'use client'

interface ProgressBarProps {
  currentStep: number
  steps: string[]
}

export function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  const percentage = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="w-full">
      <div
        className="w-full h-1 bg-border rounded-sm overflow-hidden"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
      >
        <div
          className="h-full bg-primary transition-[width] ease-in-out"
          style={{ width: `${percentage}%`, transitionDuration: '400ms' }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isComplete = index < currentStep
          return (
            <span
              key={step}
              className={[
                'text-xs font-body',
                isActive
                  ? 'text-primary font-semibold'
                  : isComplete
                    ? 'text-primary-lighter'
                    : 'text-text-muted',
              ].join(' ')}
            >
              {index + 1}. {step}
            </span>
          )
        })}
      </div>
    </div>
  )
}
