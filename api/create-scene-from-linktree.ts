import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const directoryName = path.basename(__dirname);
console.log(directoryName); 

const linkTreePagesFile = path.resolve(directoryName + "/jmv/", path.parse('../../data/linktree-pages/linktree-pages.json').dir + "/" + path.parse('../../data/linktree-pages/linktree-pages.json').base)

interface LinkTreePage {
  name: string;
  link: string;
}

class LinkTreePagesAPI {
  private linkTreePages : LinkTreePage[] = []

  constructor () {
    this.linkTreePages = JSON.parse(fs.readFileSync(linkTreePagesFile, { encoding: 'utf-8' })).pages
  }

  list () {
    return this.linkTreePages
  }

  get (index : number) : LinkTreePage {
    return this.linkTreePages[index]
  }

}

const api = new LinkTreePagesAPI
export default api