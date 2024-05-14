const zod = require("zod");

const todoSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    completed: zod.boolean()
});

const updateSchema = zod.object({
    _id: zod.string().nonempty()
});

module.exports = {
    updateSchema,
    todoSchema
};
