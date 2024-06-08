import { execSync } from 'node:child_process'
import process from 'node:process'
import { dirname } from 'node:path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import gm from 'gray-matter'

const from = `${process.cwd()}/press`.replaceAll('\\', '/')
const dest = `${process.cwd()}/.vitepress/data`.replaceAll('\\', '/')

async function dumpMarkdowns(cwd = from) {
  const markdownFiles = await fg('**/*.md', { cwd })
  const results = await Promise.all(
    markdownFiles.map(file => {
      const slug = file.split('/', 1)[0]
      const fp = `${cwd}/${file}`
      const { data, excerpt, content } = gm.read(fp, {
        excerpt: slug === 'posts',
      })
      const { date, title, description, cover, category, tags, draft } = data
      if (!date || !title || draft) {
        return false
      }
      let coverImage = cover
      if (!coverImage) {
        const match = content.match(/(?<=!\[.*\]\()(.+)(?=\))/g)
        match && (coverImage = match)
      }

      return {
        slug,
        link: `/${file.replace(/\.md$/, '')}`,
        date: new Date(Date.parse(date)).toISOString(),
        title,
        category,
        tags,
        description: description || formatExcerpt(excerpt),
        cover: coverImage,
        lastUpdateTime: getLastUpdateTime(fp),
      }
    }),
  )

  return results
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .reduce(
      (acc, cur) => {
        const { slug, ...rest } = cur
        acc[slug] ? acc[slug].push(rest) : (acc[slug] = [rest])
        return acc
      },
      {
        posts: [],
        notes: [],
      },
    )
}

function formatExcerpt(excerpt, limit = 100) {
  if (!excerpt) {
    return
  }
  const markdownImageRegex = /!\[(.*?)\]\((.*?)\)/g
  return excerpt
    .replaceAll(markdownImageRegex, '')
    .replaceAll(/[\n\r]/g, '')
    .slice(0, limit)
}

function getLastUpdateTime(filepath) {
  try {
    const dir = dirname(filepath)
    const command = `cd ${dir} && git log -1 --pretty="format:%ci" ${filepath}`
    const lastUpdateTime = execSync(command, { encoding: 'utf-8' })
    return new Date(lastUpdateTime.trim()).toISOString()
  } catch {}
}

function saveToJson(raw, saveDir = dest) {
  Object.keys(raw).map(async key => {
    const savePath = `${saveDir}/__${key}.json`
    console.log(`dump ${raw[key].length} ${key} to ${savePath}`)
    await fs.outputJSON(savePath, raw[key], {
      spaces: 2,
    })
  })
}

dumpMarkdowns()
  .then(res => saveToJson(res))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
