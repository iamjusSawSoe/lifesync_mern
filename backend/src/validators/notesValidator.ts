export const createNoteValidationSchema = {
  title: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Title must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Title must not be empty",
    },
    isString: {
      errorMessage: "Title must be string",
    },
  },
  content: {
    notEmpty: true,
  },
};

export const updateNoteValidationSchema = {
  id: {
    isMongoId: {
      errorMessage: "Invalid Note Id",
    },
  },
  title: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Title must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Title must not be empty",
    },
    isString: {
      errorMessage: "Title must be string",
    },
  },
  content: {
    notEmpty: true,
  },
};

export const findDeleteNoteValidationSchema = {
  id: {
    isMongoId: {
      errorMessage: "Invalid Note Id",
    },
  },
};
