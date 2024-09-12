import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
  }

  async createNote(request, response, next) {
    try {
      const noteData = request.body
      const user = request.userInfo
      noteData.creatorId = user.id
      const note = await notesService.createNote(noteData)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }
}