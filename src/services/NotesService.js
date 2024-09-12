import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class NotesService {
  async deleteNote(noteId, userId) {
    const noteToDelete = await dbContext.Notes.findById(noteId)
    if (noteToDelete.creatorId != userId) {
      throw new Forbidden('Not your note to delete, friendo')
    }
    await noteToDelete.deleteOne()
    return `${noteToDelete.body} has been deleted`
  }
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId }).populate('bug').populate('creator')
    return notes
  }
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')
    return note
  }
}
export const notesService = new NotesService()