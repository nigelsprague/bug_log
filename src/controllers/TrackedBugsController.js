import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService";
import BaseController from "../utils/BaseController";

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.deleteTrackedBug)
  }

  async deleteTrackedBug(request, response, next) {
    try {
      const trackedBugId = request.params.trackedBugId
      const user = request.userInfo
      const message = await trackedBugsService.deleteTrackedBug(trackedBugId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async createTrackedBug(request, response, next) {
    try {
      const trackedBugData = request.body
      const user = request.userInfo
      trackedBugData.accountId = user.id
      const trackedBug = await trackedBugsService.createTrackedBug(trackedBugData)
      response.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}