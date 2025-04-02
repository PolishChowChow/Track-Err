import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const get_structure = async (req, res) => {
  const structure = await prisma.structures.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (structure === null) {
    return res.status(404).json({
      error: "Structure not found",
    });
  }
  return res.status(200).json({
    data: structure,
  });
};

const get_all_structures = async (req, res) => {
  const structures = await prisma.structures.findMany({
    orderBy: [
      {
        type: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
  if (structures.length < 1) {
    return res.status(404).json({
      error: "Structures not found",
    });
  }
  return res.status(200).json({
    data: structures,
  });
};

const save_structure = async (req, res) => {
  await prisma.structures
    .create({
      data: {
        ...req.body,
      },
    })
    .then(() => {
      return res.status(201).json({
        message: "success",
      });
    })
    .catch((error) => {
      return res.json({
        error,
      });
    });
};

const update_structure = async (req, res) => {
  await prisma.structures
    .update({
      where: {
        id: req.params.id,
      },
      body: {
        ...req.body,
      },
    })
    .then((response) => {
      return res.json({
        response,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
      });
    });
};

const delete_structure = async (req, res) => {
  await prisma.structures
    .delete({
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      return res.json({
        response,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
      });
    });
};

const delete_all_error_records = async (req, res) => {
  await prisma.structures
    .deleteMany()
    .then((response) => {
      return res.status(200).json({
        message: `${response.count} structures were deleted`,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
      });
    });
};

export default {
  get_structure,
  get_all_structures,
  save_structure,
  update_structure,
  delete_all_error_records: delete_all_error_records,
  delete_structure,
};
