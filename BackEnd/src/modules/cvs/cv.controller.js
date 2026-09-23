const cvService = require("./cv.service");

class CvController {
  // POST /api/cvs
  async upload(req, res) {
    try {
      const userId = req.user.id;
      const filePath = req.file ? req.file.path : null;

      const result = await cvService.uploadCv(userId, filePath);

      return res.status(201).json({
        success: true,
        message: "CV uploaded successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/cvs/me
  async getMyCv(req, res) {
    try {
      const userId = req.user.id;
      const cv = await cvService.getMyCv(userId);

      return res.status(200).json({
        success: true,
        data: cv,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/cvs/:id
  async getById(req, res) {
    try {
      const cv = await cvService.getCvById(req.params.id);

      return res.status(200).json({
        success: true,
        data: cv,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE /api/cvs
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const result = await cvService.deleteCv(userId);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CvController();