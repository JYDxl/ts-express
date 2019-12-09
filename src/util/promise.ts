import * as request from "superagent";

/**
 * superagent.
 *
 * @param url {string}
 * @return  {Promise<string>}
 */
const agent = async (url: string) => {
  return new Promise<string>((resolve, reject) => {
    request.get(url, (err, res) => {
      err ? reject(err) : resolve(res.text);
    });
  });
};

export {agent};
