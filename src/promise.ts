import * as superagent from 'superagent'

async function agent(url): Promise<string> {
  return new Promise((resolve: (value?: string) => void, reject: (reason?: any) => void): void => {
    superagent.get(url, (err, res): void => {
      if (err) {
        reject(err);
      } else {
        resolve(res.text)
      }
    })
  })
}

export {agent}
