import { join } from 'node:path'
import process from 'node:process'
import axios from 'axios'
import fs from 'fs-extra'

// GitHub: owner/repo
const endPoints = [
  // about.md
  'vuejs/core',
  'vuejs/vitepress',
  'vueuse/vueuse',
  'unocss/unocss',
  // ts-type-gym.md
  'type-challenges/type-challenges',
  'sindresorhus/type-fest',
  'total-typescript/ts-reset',
]

async function request(endPoint) {
  const api = `https://api.github.com/repos/${endPoint}`
  const { data } = await axios.get(api, {
    headers: {
      Accept: 'application/vnd.github.v4+json',
    },
  })
  return {
    key: endPoint,
    avatar_url: data?.owner.avatar_url,
    html_url: data.html_url,
    description: data.description,
    language: data.language,
    stargazers_count: data.stargazers_count,
    forks_count: data.forks_count,
    pushed_at: data.pushed_at,
  }
}

async function main() {
  const items = (
    await Promise.all(endPoints.map(endPoint => request(endPoint)))
  ).reduce((prev, curr) => {
    prev[curr.key] = { ...curr, key: undefined }
    return prev
  }, {})

  await fs.outputJSON(
    join(process.cwd(), '.vitepress/data/repos.json'),
    {
      stamp: Date.now(),
      items,
    },
    {
      spaces: 2,
    },
  )
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
