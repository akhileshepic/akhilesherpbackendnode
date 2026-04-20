const moduleSchema = require('./moduleSchema');

const createModule = async (data) => {
    const existingModule = await moduleSchema.findOne({ name: data.name });
    if (existingModule) {
        throw new Error('Module with this name already exists');
    }   
    const createmodule = new moduleSchema(data);
    return await createmodule.save();
}

const getAllModules = async () => {
    return await moduleSchema.find();   
}

module.exports = {
    createModule,
    getAllModules,
}