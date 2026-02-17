import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const tutorRegistrationApi = {
  saveAboutStep: async (data: any) => {
    const response = await axios.post(
      `${API_URL}/tutor-registration/about`,
      data,
    );
    return response.data;
  },

  savePhotoStep: async (tutorId: number, photo: File) => {
    const formData = new FormData();
    formData.append("tutorId", tutorId.toString());
    formData.append("photo", photo);

    const response = await axios.post(
      `${API_URL}/tutor-registration/photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  saveCertificationStep: async (tutorId: number, data: any) => {
    const formData = new FormData();
    formData.append("tutorId", tutorId.toString());
    formData.append(
      "hasNoCertificate",
      data.hasNoCertificate ? "true" : "false",
    );

    if (data.certifications && data.certifications.length > 0) {
      data.certifications.forEach((cert: any, index: number) => {
        formData.append(
          `certifications[${index}][subject]`,
          cert.subject || "",
        );
        formData.append(
          `certifications[${index}][certification]`,
          cert.certification || "",
        );
        formData.append(
          `certifications[${index}][yearsFrom]`,
          cert.yearsFrom || "",
        );
        formData.append(
          `certifications[${index}][yearsTo]`,
          cert.yearsTo || "",
        );
        if (cert.file) {
          formData.append(`certifications[${index}][file]`, cert.file);
        }
      });
    }

    const response = await axios.post(
      `${API_URL}/tutor-registration/certification`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  saveEducationStep: async (tutorId: number, data: any) => {
    const formData = new FormData();
    formData.append("tutorId", tutorId.toString());
    formData.append("hasNoEducation", data.hasNoEducation ? "true" : "false");

    if (data.education && data.education.length > 0) {
      data.education.forEach((edu: any, index: number) => {
        formData.append(
          `education[${index}][university]`,
          edu.university || "",
        );
        formData.append(`education[${index}][degree]`, edu.degree || "");
        formData.append(
          `education[${index}][degreeType]`,
          edu.degreeType || "",
        );
        formData.append(
          `education[${index}][specialization]`,
          edu.specialization || "",
        );
        formData.append(`education[${index}][yearsFrom]`, edu.yearsFrom || "");
        formData.append(`education[${index}][yearsTo]`, edu.yearsTo || "");
        if (edu.diplomaFile) {
          formData.append(`education[${index}][diplomaFile]`, edu.diplomaFile);
        }
      });
    }

    const response = await axios.post(
      `${API_URL}/tutor-registration/education`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  saveDescriptionStep: async (tutorId: number, description: string) => {
    const response = await axios.post(
      `${API_URL}/tutor-registration/description`,
      {
        tutorId,
        description,
      },
    );
    return response.data;
  },

  saveVideoStep: async (tutorId: number, data: any) => {
    const formData = new FormData();
    formData.append("tutorId", tutorId.toString());

    if (data.introVideo) {
      formData.append("introVideo", data.introVideo);
    }
    if (data.videoLink) {
      formData.append("videoLink", data.videoLink);
    }
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    const response = await axios.post(
      `${API_URL}/tutor-registration/video`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
  saveAvailabilityStep: async (tutorId: number, data: any) => {
    // Filtrer seulement les jours avec des slots valides
    const availabilityArray = Object.keys(data.availability || {})
      .filter((day) => {
        const slots = data.availability[day];
        // Vérifier qu'il y a des slots et qu'ils ont des valeurs
        return (
          slots &&
          slots.length > 0 &&
          slots.some((slot: any) => slot.from && slot.to)
        );
      })
      .map((day) => ({
        day: day,
        slots: data.availability[day].filter(
          (slot: any) => slot.from && slot.to,
        ), // Filtrer les slots vides
      }));

    const response = await axios.post(
      `${API_URL}/tutor-registration/availability`,
      {
        tutorId,
        timezone: data.timezone,
        availability: availabilityArray,
      },
    );
    return response.data;
  },
  savePricingStep: async (tutorId: number, hourlyRate: string) => {
    const response = await axios.post(
      `${API_URL}/tutor-registration/pricing`,
      {
        tutorId,
        hourlyRate,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  },

  submitProfile: async (tutorId: number) => {
    const response = await axios.post(`${API_URL}/tutor-registration/submit`, {
      tutorId,
    });
    return response.data;
  },
  getDraft: async (email: string) => {
    const response = await axios.get(
      `${API_URL}/tutor-registration/draft/${email}`,
    );
    return response.data;
  },
};
