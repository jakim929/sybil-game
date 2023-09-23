import { SubmissionPayload } from '@/pages/Play/types'
import { create } from 'zustand'
import { produce } from 'immer'
import { Hex } from 'viem'
import { persist } from 'zustand/middleware'

interface SubmissionPayloadState {
  submissionPayloadByCommitment: Record<Hex, SubmissionPayload>
  setSubmissionPayload: (
    commitment: Hex,
    submissionPayload: SubmissionPayload,
  ) => void
  reset: () => void
}

export const useSubmissionPayloadState = create<SubmissionPayloadState>()(
  persist(
    (set, get) => ({
      submissionPayloadByCommitment: {},
      setSubmissionPayload: (commitment, submissionPayload) => {
        set({
          submissionPayloadByCommitment: produce(
            get().submissionPayloadByCommitment,
            (draft) => {
              draft[commitment] = submissionPayload
            },
          ),
        })
      },
      reset: () => {
        set({})
      },
    }),
    {
      name: 'submission-payload-storage',
    },
  ),
)
