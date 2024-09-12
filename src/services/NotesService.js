import { dbContext } from "../db/DbContext"

class NotesService {
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