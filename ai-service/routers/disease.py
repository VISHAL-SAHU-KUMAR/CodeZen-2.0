from fastapi import APIRouter, File, UploadFile, HTTPException
from PIL import Image
import io
import random

router = APIRouter()

DISEASES = [
    "Tomato Early Blight",
    "Tomato Late Blight",
    "Potato Early Blight",
    "Potato Late Blight",
    "Corn Common Rust",
    "Healthy"
]

@router.post("/detect")
async def detect_disease(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        # Preprocess image here (resize, normalize)
        
        # Mock prediction
        prediction = random.choice(DISEASES)
        confidence = round(random.uniform(0.7, 0.99), 2)
        
        return {
            "disease": prediction,
            "confidence": confidence,
            "image_size": image.size,
            "treatment": "Apply appropriate fungicide and ensure proper drainage." if prediction != "Healthy" else "No treatment needed."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_root():
    return {"status": "ok", "module": "disease_detection"}
