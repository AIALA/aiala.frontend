export interface UpdateAiPictureMetadataModel {
  description: string;
  addedTags: string[];
  updatedTags: UpdateAiPictureTagModel[];
  removedTags: string[];
}

export interface UpdateAiPictureTagModel {
  id: string;
  name: string;
}
