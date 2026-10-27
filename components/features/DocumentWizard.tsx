'use client'

import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
} from 'lucide-react'
import type { DocumentField, DocumentType } from '@/lib/documents'
import { PARTY_FIELDS } from '@/lib/documents'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { executeRecaptchaV3, loadRecaptchaV2 } from '@/lib/recaptcha-client'

type FormValues = Record<string, string>

interface WizardProps {
  documentItem: DocumentType
}

const STEP_LABELS = ['Party details', 'Document terms', 'Review & download']

const inputClass =
  'w-full border border-border rounded-md px-3 py-2.5 text-base text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors'

export function DocumentWizard({ documentItem }: WizardProps) {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [requireV2, setRequireV2] = useState(false)
  const [v2Token, setV2Token] = useState<string | null>(null)
  const [result, setResult] = useState<{
    filename: string
    downloadUrl: string
  } | null>(null)
  const v2ContainerRef = useRef<HTMLDivElement>(null)

  const allFields = useMemo(
    () => [...PARTY_FIELDS, ...documentItem.stepTwoFields],
    [documentItem],
  )

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: Object.fromEntries(
      allFields.map((field) => [field.name, '']),
    ),
  })

  const fieldsForStep: DocumentField[] =
    step === 0
      ? PARTY_FIELDS
      : step === 1
        ? documentItem.stepTwoFields
        : []

  const validateStep = async (stepIndex: number) => {
    const names =
      stepIndex === 0
        ? PARTY_FIELDS.filter((field) => field.required).map(
            (field) => field.name,
          )
        : documentItem.stepTwoFields
            .filter((field) => field.required)
            .map((field) => field.name)
    return trigger(names)
  }

  const goNext = async () => {
    setSubmitError(null)
    const valid = await validateStep(step)
    if (!valid) return
    setStep((current) => Math.min(2, current + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setSubmitError(null)
    setStep((current) => Math.max(0, current - 1))
  }

  const handleV2Fallback = async () => {
    if (!v2ContainerRef.current) return
    await loadRecaptchaV2(v2ContainerRef.current, (token) =>
      setV2Token(token),
    )
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const token = v2Token ?? (await executeRecaptchaV3('generate_document'))
      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: documentItem.slug,
          token,
          ...getValues(),
        }),
      })

      const payload = await response.json()

      if (payload.requireV2) {
        setRequireV2(true)
        setSubmitting(false)
        await handleV2Fallback()
        return
      }

      if (!response.ok || !payload.success) {
        setSubmitError(
          payload.error ??
            'We could not generate your document. Please check your details and try again.',
        )
        setSubmitting(false)
        return
      }

      setResult({
        filename: payload.filename,
        downloadUrl: payload.downloadUrl,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError('A network problem stopped the request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-surface border border-border rounded-lg shadow-card p-6 sm:p-10 text-center">
          <CheckCircle2
            size={56}
            className="text-success mx-auto"
            aria-hidden="true"
          />
          <h1 className="font-heading text-2xl sm:text-3xl text-text-primary mt-5">
            Your document is ready
          </h1>
          <p className="font-body text-sm text-text-secondary mt-3">
            Your {documentItem.name} was generated successfully and is ready to
            download, sign, and share.
          </p>
          <p className="font-body text-sm font-medium text-primary mt-4 break-all">
            {result.filename}
          </p>

          {result.downloadUrl.startsWith('data:') && (
            <div className="mt-6 max-h-[60vh] overflow-y-auto border border-border rounded-lg">
              <iframe
                title="Document preview"
                src={result.downloadUrl}
                className="w-full h-[60vh]"
              />
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={result.downloadUrl}
              download={result.filename}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-md bg-primary text-white px-6 py-3 text-sm font-medium w-full sm:w-auto hover:shadow-card-hover hover:scale-[1.02] transition-all duration-150"
            >
              <Download size={18} aria-hidden="true" />
              Download PDF
            </a>
            <Link
              href="/documents"
              className="inline-flex items-center justify-center min-h-[44px] rounded-md border border-border px-6 py-3 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
            >
              Generate Another Document
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-alt min-h-screen">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <nav
          aria-label="Breadcrumb"
          className="font-body text-sm text-text-muted"
        >
          <Link href="/documents" className="hover:text-primary">
            Documents
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{documentItem.name}</span>
        </nav>

        <h1 className="font-heading text-3xl text-text-primary mt-3">
          {documentItem.name}
        </h1>
        <p className="font-body text-sm text-text-secondary mt-2">
          {documentItem.description}
        </p>

        <div className="mt-8 bg-surface border border-border rounded-lg shadow-card p-5 sm:p-8">
          <ProgressBar currentStep={step} steps={STEP_LABELS} />

          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault()
              if (step < 2) {
                void goNext()
              } else {
                void handleSubmit()
              }
            }}
            noValidate
          >
            {step < 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fieldsForStep.map((field) => (
                  <FieldInput
                    key={field.name}
                    field={field}
                    register={register}
                    error={errors[field.name]?.message}
                  />
                ))}
              </div>
            )}

            {step === 2 && (
              <ReviewStep
                documentItem={documentItem}
                values={getValues()}
                onEdit={(targetStep) => setStep(targetStep)}
              />
            )}

            {requireV2 && (
              <div className="mt-6 border border-warning/30 bg-surface-alt rounded-md p-4">
                <p className="font-body text-sm text-warning">
                  Additional verification is required before your document can
                  be generated. Please complete the check below, then submit
                  again.
                </p>
                <div ref={v2ContainerRef} className="mt-3" />
              </div>
            )}

            {submitError && (
              <p
                role="alert"
                className="font-body text-sm text-error mt-4"
              >
                {submitError}
              </p>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-6 mt-8 border-t border-border">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={submitting}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Back
                </Button>
              ) : (
                <Link
                  href="/documents"
                  className="inline-flex items-center justify-center min-h-[44px] rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
                >
                  Cancel
                </Link>
              )}

              {step < 2 ? (
                <Button type="submit">
                  Continue
                  <ChevronRight size={16} aria-hidden="true" />
                </Button>
              ) : (
                <Button type="submit" disabled={submitting || (requireV2 && !v2Token)}>
                  {submitting ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Generating...
                    </>
                  ) : (
                    'Generate document'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function FieldInput({
  field,
  register,
  error,
}: {
  field: DocumentField
  register: ReturnType<typeof useForm<FormValues>>['register']
  error?: string
}) {
  const widthClass = field.half ? 'sm:col-span-1' : 'sm:col-span-2'
  const validation = {
    required: field.required ? `${field.label} is required` : false,
    ...(field.type === 'email'
      ? {
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        }
      : {}),
    ...(field.type === 'number'
      ? {
          min: { value: 0, message: 'Enter a positive amount' },
        }
      : {}),
  }

  return (
    <div className={widthClass}>
      <label
        htmlFor={field.name}
        className="block font-body text-sm font-medium text-text-primary mb-1"
      >
        {field.label}
        {field.required && <span className="text-error"> *</span>}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          id={field.name}
          rows={4}
          placeholder={field.placeholder}
          className={inputClass}
          {...register(field.name, validation)}
        />
      ) : field.type === 'select' ? (
        <select
          id={field.name}
          className={inputClass}
          defaultValue=""
          {...register(field.name, validation)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          type={field.type}
          inputMode={field.type === 'number' ? 'numeric' : undefined}
          placeholder={field.placeholder}
          className={inputClass}
          {...register(field.name, validation)}
        />
      )}

      {field.help && (
        <p className="font-body text-xs text-text-muted mt-1">{field.help}</p>
      )}
      {error && <p className="font-body text-sm text-error mt-1">{error}</p>}
    </div>
  )
}

function ReviewStep({
  documentItem,
  values,
  onEdit,
}: {
  documentItem: DocumentType
  values: FormValues
  onEdit: (step: number) => void
}) {
  const sections = [
    { title: 'Party details', step: 0, fields: PARTY_FIELDS },
    {
      title: 'Document terms',
      step: 1,
      fields: documentItem.stepTwoFields,
    },
  ]

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.title}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-heading text-lg text-text-primary">
              {section.title}
            </h2>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              className="min-h-[44px] inline-flex items-center font-body text-sm font-medium text-primary hover:text-primary-light"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 border border-border rounded-lg divide-y divide-border">
            {section.fields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3"
              >
                <dt className="font-body text-sm text-text-muted">
                  {field.label}
                </dt>
                <dd className="font-body text-sm text-text-primary sm:col-span-2 break-words">
                  {values[field.name]?.trim() ? values[field.name] : (
                    <span className="text-text-muted">Not provided</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
