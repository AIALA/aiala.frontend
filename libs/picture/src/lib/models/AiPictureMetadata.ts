export class AiPictureMetadata {
  id: string;
  description: string;
  descriptionConfidence: number;
  tags: AiPictureTag[];
}

export interface AiPictureTag {
  id: string;
  name: string;
  confidence: number;
}
