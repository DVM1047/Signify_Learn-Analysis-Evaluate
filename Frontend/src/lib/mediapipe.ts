// Stub for Phase 4: MediaPipe Hands landmark detection
export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export async function initMediaPipe(): Promise<boolean> {
  console.log('MediaPipe Hands initialized for future phases');
  return true;
}
