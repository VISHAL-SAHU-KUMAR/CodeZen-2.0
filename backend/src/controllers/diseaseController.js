exports.detectDisease = async (req, res) => {
  try {
    // In real app, send image to AI service
    res.status(200).json({
      success: true,
      result: {
        disease: "Tomato Early Blight",
        confidence: 0.95,
        treatment: "Apply fungicide copper oxychloride."
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  res.status(200).json({
    success: true,
    history: [
      { id: 1, disease: "Tomato Early Blight", date: "2023-05-10" },
      { id: 2, disease: "Potato Late Blight", date: "2023-05-12" }
    ]
  });
};

exports.getDiseaseDetails = async (req, res) => {
  res.status(200).json({
    success: true,
    disease: {
      id: req.params.id,
      name: "Tomato Early Blight",
      symptoms: ["Dark spots on leaves", "Yellowing"],
      treatment: "Apply fungicide"
    }
  });
};
