import dotenv from 'dotenv'

dotenv.config()

export default function (envVar: string): string {
  const environmentVariable = process.env[envVar]
  if (typeof environmentVariable === 'undefined') {
    throw new Error(`${envVar} is undefined. Please define this environment variable.`)
  } else {
    return environmentVariable
  }
}
