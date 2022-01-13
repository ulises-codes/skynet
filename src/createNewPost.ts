import * as Readline from 'readline'
import * as fs from 'fs'
import uploadImage from './uploadImage'

interface NewPost {
  title: string
  author: string
  tags: string[]
  excerpt: string
  publishDate?: string
  headerImageSrc?: string
  headerImageAlt?: string
  headerImageCaption?: string
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default async function createBlogPost(outDir = './blog') {
  const answers: NewPost = {
    title: '',
    author: 'Ulises Himely',
    publishDate: formatDate(new Date()),
    excerpt: '',
    tags: [],
  }

  let filename: string

  const readline = Readline.createInterface(
    process.stdin,
    process.stdout as unknown as NodeJS.WritableStream
  )

  readline.question('Title: ', title => {
    answers.title = title

    filename = answers.title.toLowerCase().replace(/ /g, '-')

    readline.question('Author: ', author => {
      answers.author = author

      readline.question('Publish Date: ', publishDate => {
        if (publishDate && new Date(publishDate)) {
          answers.publishDate = formatDate(new Date(publishDate))
        }

        readline.question('Excerpt: ', excerpt => {
          answers.excerpt = excerpt

          readline.question('Tags: ', tags => {
            answers.tags = tags.split('; ')

            readline.question('Header Image Src: ', async headerImageSrc => {
              if (headerImageSrc) {
                answers.headerImageSrc = await uploadImage(
                  headerImageSrc,
                  filename
                )
              }

              readline.question('Header Image Alt: ', headerImageAlt => {
                if (headerImageAlt) {
                  answers.headerImageAlt = headerImageAlt
                }

                readline.question(
                  'Header Image Caption: ',
                  headerImageCaption => {
                    if (headerImageCaption) {
                      answers.headerImageCaption = headerImageCaption
                    }

                    let fileContents = '---\n'

                    for (const [key, value] of Object.entries(answers)) {
                      if (Array.isArray(value)) {
                        value.forEach((item, i) => {
                          if (i === 0) {
                            fileContents += `${key}:\n`
                          }
                          fileContents += `\t-${item}\n`
                        })
                        continue
                      }
                      fileContents += `${key}: "${value}"\n`
                    }

                    fileContents += '---'

                    fs.mkdirSync(outDir, { recursive: true })

                    fs.writeFileSync(`${outDir}/${filename}.mdx`, fileContents)

                    readline.close()
                  }
                )
              })
            })
          })
        })
      })

      readline.write(answers.publishDate)
    })

    readline.write('Ulises Himely')
  })
}
