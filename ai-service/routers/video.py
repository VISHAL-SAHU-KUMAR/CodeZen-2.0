from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.video_generation_service import get_video_service

router = APIRouter()
video_service = get_video_service()

class VideoInput(BaseModel):
    topic: str
    language: str
    disease_data: dict = {}

@router.post("/generate")
async def generate_video(data: VideoInput):
    try:
        # If disease_data is provided, use it, otherwise use topic as name
        if not data.disease_data:
            data.disease_data = {"name": data.topic}
            
        result = await video_service.generate_disease_video(data.disease_data, data.language)
        
        if result.get('success'):
            return result
        else:
            raise HTTPException(status_code=500, detail=result.get('error'))
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_root():
    return {"status": "ok", "module": "video_generation"}
