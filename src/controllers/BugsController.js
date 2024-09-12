import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const user = request.userInfo
      bugData.creatorId = user.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}