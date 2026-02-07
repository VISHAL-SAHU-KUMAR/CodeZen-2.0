from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
import os
from models.soil_analysis.ocr_model import get_ocr_service

router = APIRouter()
ocr_service = get_ocr_service()

class SoilInput(BaseModel):
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float

@router.post("/analyze")
async def analyze_soil(data: SoilInput):
    try:
        recommendations = []
        
        if data.ph < 6.0:
            recommendations.append("Add lime to increase pH.")
        elif data.ph > 7.5:
            recommendations.append("Add sulfur to decrease pH.")
            
        if data.nitrogen < 50:
            recommendations.append("Nitrogen is low. Apply urea or ammonium nitrate.")
        
        if data.phosphorus < 30:
            recommendations.append("Phosphorus is low. Apply superphosphate.")
            
        if data.potassium < 40:
            recommendations.append("Potassium is low. Apply muriate of potash.")
            
        if not recommendations:
            recommendations.append("Soil is healthy and balanced.")
            
        return {
            "status": "Analyzed",
            "recommendations": recommendations,
            "suitable_crops": ["Wheat", "Corn", "Soybean"] if 6.0 <= data.ph <= 7.0 else ["Rice", "Tea"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-report")
async def analyze_report(file: UploadFile = File(...)):
    try:
        # Save file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())
            
        result = ocr_service.analyze_report(temp_path)
        
        # Cleanup
        if os.path.exists(temp_path):
            os.remove(temp_path)
            
        if result.get('success'):
            recs = ocr_service.get_recommendations(result['data'])
            return {
                "status": "success",
                "extracted_data": result['data'],
                "recommendations": recs
            }
        else:
            raise HTTPException(status_code=500, detail=result.get('error'))
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def read_root():
    return {"status": "ok", "module": "soil_analysis"}
