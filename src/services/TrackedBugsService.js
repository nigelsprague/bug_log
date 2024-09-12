import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TrackedBugsService {
  async deleteTrackedBug(trackedBugId, userId) {
    const bugToDelete = await dbContext.TrackedBugs.findById(trackedBugId)
    if (bugToDelete.accountId != userId) {
      throw new Forbidden("Not your tracker to delete, bud")
    }
    await bugToDelete.deleteOne()
    return `${bugToDelete} has been deleted`
  }

  async getTrackersByBug(bugId) {
    const trackers = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('bug').populate('tracker')
    return trackers
  }

  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker')
    await trackedBug.populate('bug')
    return trackedBug
  }

  async getMyBugs(userId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug').populate('tracker')
    return trackedBugs
  }
}

export const trackedBugsService = new TrackedBugsService()