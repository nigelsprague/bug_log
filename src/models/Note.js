import { Schema } from "mongoose";

export const NoteSchema = new Schema(
  {
    body: { type: String, minlength: 5, maxlength: 500, required: true },
    bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

NoteSchema.virtual('bug', {
  localField: 'bugId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})