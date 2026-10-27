'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  executeRecaptchaV3,
  loadRecaptchaV2,
} from '@/lib/recaptcha-client'
import { DEFAULT_WHATSAPP_LINK } from '@/lib/site'

interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

interface FieldIssue {
  name?: string[]
  email?: string[]
  subject?: string[]
  message?: string[]
}

const inputClass =
  'w-full min-h-[44px] border border-border rounded-md px-3 py-2.5 text-base text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>()

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fieldIssues, setFieldIssues] = useState<FieldIssue>({})
  const [requireV2, setRequireV2] = useState(false)
  const [v2Token, setV2Token] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const v2ContainerRef = useRef<HTMLDivElement>(null)

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true)
    setSubmitError(null)
    setFieldIssues({})

    try {
      const token = v2Token ?? (await executeRecaptchaV3('send_enquiry'))

      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, token, v2Token: v2Token ?? undefined }),
      })

      const payload = (await response.json()) as {
        success?: boolean
        error?: string
        requireV2?: boolean
        issues?: FieldIssue
      }

      if (response.status === 403 && payload.requireV2) {
        setRequireV2(true)
        if (v2ContainerRef.current) {
          await loadRecaptchaV2(v2ContainerRef.current, (challengeToken) =>
            setV2Token(challengeToken),
          )
        }
        setSubmitError(
          'Please complete the additional verification below, then send your message again.',
        )
        return
      }

      if (!response.ok || !payload.success) {
        if (payload.issues) setFieldIssues(payload.issues)
        setSubmitError(
          payload.error ??
            'Your message could not be sent. Please try again or use WhatsApp.',
        )
        return
      }

      setSent(true)
    } catch {
      setSubmitError(
        'A network problem stopped your message. Please check your connection and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle2
          size={48}
          className="mx-auto text-primary"
          aria-hidden="true"
        />
        <h2 className="font-heading text-2xl text-text-primary mt-4">
          Message sent
        </h2>
        <p className="font-body text-base text-text-secondary mt-3 max-w-md mx-auto">
          Thank you for contacting Ezekiel Docs. Our team replies within one
          business day. For urgent matters, WhatsApp is the fastest channel.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Button href={DEFAULT_WHATSAPP_LINK} external variant="outline">
            <MessageCircle size={16} aria-hidden="true" />
            Chat on WhatsApp
          </Button>
          <Button href="/">Back to home</Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Wanjiku"
            aria-invalid={Boolean(errors.name || fieldIssues.name)}
            className={inputClass}
            {...register('name', {
              required: 'Please enter your name',
              minLength: { value: 2, message: 'Please enter your name' },
            })}
          />
          {(errors.name || fieldIssues.name) && (
            <p role="alert" className="font-body text-sm text-error mt-1.5">
              {errors.name?.message ?? fieldIssues.name?.[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@business.co.ke"
            aria-invalid={Boolean(errors.email || fieldIssues.email)}
            className={inputClass}
            {...register('email', {
              required: 'Please enter a valid email address',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {(errors.email || fieldIssues.email) && (
            <p role="alert" className="font-body text-sm text-error mt-1.5">
              {errors.email?.message ?? fieldIssues.email?.[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="How can we help?"
            aria-invalid={Boolean(errors.subject || fieldIssues.subject)}
            className={inputClass}
            {...register('subject', {
              required: 'Please add a short subject',
              minLength: {
                value: 3,
                message: 'Please add a short subject',
              },
            })}
          />
          {(errors.subject || fieldIssues.subject) && (
            <p role="alert" className="font-body text-sm text-error mt-1.5">
              {errors.subject?.message ?? fieldIssues.subject?.[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-body text-sm font-medium text-text-primary mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Tell us about the document or help you need (at least 20 characters)."
            aria-invalid={Boolean(errors.message || fieldIssues.message)}
            className={`${inputClass} min-h-[140px] resize-y py-3`}
            {...register('message', {
              required: 'Tell us a little more in your message',
              minLength: {
                value: 20,
                message: 'Tell us a little more in your message',
              },
            })}
          />
          {(errors.message || fieldIssues.message) && (
            <p role="alert" className="font-body text-sm text-error mt-1.5">
              {errors.message?.message ?? fieldIssues.message?.[0]}
            </p>
          )}
        </div>
      </div>

      {requireV2 && (
        <div className="mt-6 border border-warning/30 bg-surface-alt rounded-md p-4">
          <p className="font-body text-sm text-warning">
            Additional verification is required before your message can be
            sent. Complete the check below, then press Send message again.
          </p>
          <div ref={v2ContainerRef} className="mt-3" />
        </div>
      )}

      {submitError && !requireV2 && (
        <p role="alert" className="font-body text-sm text-error mt-4">
          {submitError}
        </p>
      )}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          type="submit"
          fullWidth
          disabled={submitting || (requireV2 && !v2Token)}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Send message'
          )}
        </Button>
        <a
          href={DEFAULT_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] font-body text-sm font-medium text-primary hover:text-primary-light transition-colors"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Prefer WhatsApp?
        </a>
      </div>
    </form>
  )
}
