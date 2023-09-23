// Right now the options are hardcoded, but we can commit this to IPFS

export const questionsByRound: Record<
  number,
  {
    question: string

    options: string[]
    answer: string
  }
> = {
  1: {
    question:
      'Which titan of industry tweeted on 5/9/22: “Deploying more capital - steady lads”?',
    options: [
      'Do Kwon',
      'Vitalik Buterin',
      'Brian Armstrong',
      'Satoshi Nakamoto',
    ],
    answer: 'Do Kwon',
  },
  2: {
    question:
      'Consider a Merkle tree with 1,024 leaves that uses SHA256. How long is the proof size for one inclusion, in bits?',
    options: ['1024', '10', '2560', '262144'],
    answer: '2560',
  },

  3: {
    question: 'What is the best color?',
    options: ['blue', 'green', 'yellow', 'brown'],
    answer: 'blue',
  },
  4: {
    question:
      'Which titan of industry tweeted on 5/9/22: “Deploying more capital - steady lads”?',
    options: [
      'Do Kwon',
      'Vitalik Buterin',
      'Brian Armstrong',
      'Satoshi Nakamoto',
    ],
    answer: 'Do Kwon',
  },
  5: {
    question:
      'Consider a Merkle tree with 1,024 leaves that uses SHA256. How long is the proof size for one inclusion, in bits?',
    options: ['1024', '10', '2560', '262144'],
    answer: '2560',
  },
}
