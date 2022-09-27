const generateMongodbURI = (config: any): string => {
  const { MONGO_PROTOCOL, MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } =
    config;
  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
};

export { generateMongodbURI };
