"""
Soil Report OCR Analysis Service for AgriPredict360
Extracts nutrients and soil health parameters from scanned reports
"""

import os
import re
from typing import Dict, List, Optional
try:
    import pytesseract
    from PIL import Image
except ImportError:
    pytesseract = None
    Image = None

class SoilReportOCR:
    """Service to OCR and extract data from soil testing reports"""
    
    def __init__(self):
        # Configure tesseract path if needed
        # pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
        
        self.parameter_keywords = {
            'nitrogen': [r'nitrogen', r'n', r'नाइट्रोजन'],
            'phosphorus': [r'phosphorus', r'p', r'फास्फोरस'],
            'potassium': [r'potassium', r'k', r'पोटेशियम'],
            'ph': [r'ph', r'पीएच'],
            'organic_carbon': [r'organic carbon', r'oc', r'जैविक कार्बन'],
            'electrical_conductivity': [r'ec', r'electrical conductivity', r'विद्युत चालकता']
        }

    def analyze_report(self, image_path: str) -> Dict:
        """Process soil report image and return extracted values"""
        if not pytesseract:
            return {'error': 'Tesseract/PIL not installed'}
            
        try:
            # Perform OCR
            text = pytesseract.image_to_string(Image.open(image_path))
            text = text.lower()
            
            results = {}
            for param, keywords in self.parameter_keywords.items():
                results[param] = self._extract_value(text, keywords)
                
            return {
                'success': True,
                'data': results,
                'raw_text_preview': text[:200]
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def _extract_value(self, text: str, keywords: List[str]) -> Optional[float]:
        """Extract numeric value following a keyword"""
        for kw in keywords:
            # Look for keyword followed by symbols/spaces and then a number
            pattern = re.compile(rf"{kw}\s*[:=-]?\s*(\d+\.?\d*)")
            match = pattern.search(text)
            if match:
                try:
                    return float(match.group(1))
                except ValueError:
                    continue
        return None

    def get_recommendations(self, soil_data: Dict) -> List[str]:
        """Generate recommendations based on soil parameters"""
        recs = []
        
        ph = soil_data.get('ph')
        if ph:
            if ph < 6.0:
                recs.append("Soil is acidic. Consider adding lime to balance pH.")
            elif ph > 7.5:
                recs.append("Soil is alkaline. Consider adding gypsum or organic mulch.")
                
        nitrogen = soil_data.get('nitrogen')
        if nitrogen and nitrogen < 280: # Example low threshold
            recs.append("Low Nitrogen levels. Apply nitrogen-rich fertilizer like Urea.")
            
        return recs

# Factory function
def get_ocr_service() -> SoilReportOCR:
    return SoilReportOCR()
