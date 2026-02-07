from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random

router = APIRouter()

class YieldInput(BaseModel):
    crop: str
    area: float  # in hectares
    rainfall: float  # in mm
    temperature: float  # in celsius

@router.post("/predict")
async def predict_yield(data: YieldInput):
    try:
        # Mock logic based on inputs
        base_yield = 0
        if data.crop.lower() == "wheat":
            base_yield = 3.5
        elif data.crop.lower() == "rice":
            base_yield = 4.0
        elif data.crop.lower() == "corn":
            base_yield = 5.5
        else:
            base_yield = 2.0
            
        # Adjust for weather (simple logic)
        weather_factor = 1.0
        if 20 <= data.temperature <= 30:
            weather_factor *= 1.1
        else:
            weather_factor *= 0.9
            
        if data.rainfall > 100:
            weather_factor *= 1.1
            
        predicted_yield = base_yield * data.area * weather_factor * random.uniform(0.9, 1.1)
        
        return {
            "crop": data.crop,
            "predicted_yield_tons": round(predicted_yield, 2),
            "confidence": 0.85
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_root():
    return {"status": "ok", "module": "yield_prediction"}
