import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";
import { trackedBugsService } from "../services/TrackedBugsService";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.deleteBug)
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('/:bugId/trackedbugs', this.getTrackersByBug)
  }

  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const user = request.userInfo
      const message = await bugsService.deleteBug(bugId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
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

  async getAllBugs(request, response, next) {
    try {
      const bug = await bugsService.getAllBugs()
      response.send(bug)

    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const bug = await bugsService.getBugById(bugId, userInfo.id)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bugData = request.body
      const user = request.userInfo
      const bug = await bugsService.editBug(bugId, bugData, user.id)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const notes = await notesService.getNotesByBugId(bugId)
      response.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getTrackersByBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const trackers = await trackedBugsService.getTrackersByBug(bugId)
      response.send(trackers)
    } catch (error) {
      next(error)
    }

  }
}