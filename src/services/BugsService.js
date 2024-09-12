import { BugsController } from "../controllers/BugsController";
import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class BugsService {
  async deleteBug(bugId, userId) {
    const bugToDelete = await dbContext.Bugs.findById(bugId)
    if (bugToDelete.creatorId != userId) {
      throw new Forbidden("Not your bug to delete, pal")
    }
    await bugToDelete.deleteOne()
    return `${bugToDelete.title} has been deleted`
  }

  async editBug(bugId, bugData) {
    const bugToUpdate = await dbContext.Bugs.findById(bugId)
    bugToUpdate.closed = bugData.closed ?? bugToUpdate.closed
    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    await bugToUpdate.save()
    return bugToUpdate
  }

  async getAllBugs() {
    const bug = await dbContext.Bugs.find()
    return bug
  }

  async getBugById(bugId, userId) {
    const bug = await dbContext.Bugs.findById(bugId)
    await bug.populate('creator')
    if (bug.creatorId != userId) {
      throw new Forbidden("You cannot access another user's bug");
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }
}

export const bugsService = new BugsService()